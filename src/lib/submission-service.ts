import { supabase } from '@/integrations/supabase/client';

export interface SubmissionData {
  submission_type: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  requested_role?: string;
}

export class SubmissionService {
  static async createSubmission(data: SubmissionData) {
    try {
      // Use the rate-limited edge function for secure submissions
      const { data: result, error } = await supabase.functions.invoke('rate-limit-submissions', {
        body: { submissionData: data }
      });

      if (error) {
        console.error('Submission service error:', error);
        throw new Error(error.message || 'Failed to create submission');
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    } catch (error) {
      console.error('Submission service error:', error);
      throw error;
    }
  }

  static async validateSubmission(data: SubmissionData): Promise<string[]> {
    const errors: string[] = [];

    if (!data.name?.trim()) {
      errors.push('Name is required');
    }

    if (!data.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!data.submission_type?.trim()) {
      errors.push('Submission type is required');
    }

    // Prevent XSS by checking for suspicious content
    const suspiciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi
    ];

    const textFields = [data.name, data.email, data.message, data.company];
    for (const field of textFields) {
      if (field) {
        for (const pattern of suspiciousPatterns) {
          if (pattern.test(field)) {
            errors.push('Invalid characters detected in submission');
            break;
          }
        }
      }
    }

    return errors;
  }
}