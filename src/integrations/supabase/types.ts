export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      calendar_events: {
        Row: {
          attendees: Json | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string
          event_type: string
          id: string
          location: string | null
          property_id: string | null
          start_time: string
          title: string
          updated_at: string
        }
        Insert: {
          attendees?: Json | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time: string
          event_type: string
          id?: string
          location?: string | null
          property_id?: string | null
          start_time: string
          title: string
          updated_at?: string
        }
        Update: {
          attendees?: Json | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string
          event_type?: string
          id?: string
          location?: string | null
          property_id?: string | null
          start_time?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_analytics: {
        Row: {
          campaign_id: string
          clicks: number | null
          conversions: number | null
          cpc: number | null
          created_at: string | null
          ctr: number | null
          date: string
          id: string
          impressions: number | null
          recorded_at: string | null
          spend: number | null
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          conversions?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          id?: string
          impressions?: number | null
          recorded_at?: string | null
          spend?: number | null
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          conversions?: number | null
          cpc?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          id?: string
          impressions?: number | null
          recorded_at?: string | null
          spend?: number | null
        }
        Relationships: []
      }
      contact_interactions: {
        Row: {
          completed_at: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          interaction_type: string
          scheduled_at: string | null
          subject: string
        }
        Insert: {
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          interaction_type: string
          scheduled_at?: string | null
          subject: string
        }
        Update: {
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          interaction_type?: string
          scheduled_at?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          company: string | null
          contact_type: string
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          status: string
          tags: Json | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          contact_type: string
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          tags?: Json | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          contact_type?: string
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          tags?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      conversion_analytics: {
        Row: {
          conversion_type: string
          count: number | null
          created_at: string | null
          date: string
          id: string
          recorded_at: string | null
          source: string | null
          value: number | null
        }
        Insert: {
          conversion_type: string
          count?: number | null
          created_at?: string | null
          date: string
          id?: string
          recorded_at?: string | null
          source?: string | null
          value?: number | null
        }
        Update: {
          conversion_type?: string
          count?: number | null
          created_at?: string | null
          date?: string
          id?: string
          recorded_at?: string | null
          source?: string | null
          value?: number | null
        }
        Relationships: []
      }
      financial_reports: {
        Row: {
          created_at: string
          created_by: string | null
          data: Json
          id: string
          period_end: string
          period_start: string
          report_type: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          period_end: string
          period_start: string
          report_type: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          data?: Json
          id?: string
          period_end?: string
          period_start?: string
          report_type?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ll_leads: {
        Row: {
          area: string
          asking_price: number | null
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          estimated_budget: number | null
          id: string
          property_type: Database["public"]["Enums"]["property_type"]
          qualification_notes: string | null
          size_sqm: number | null
          source: string
          status: Database["public"]["Enums"]["lead_status"] | null
          updated_at: string | null
        }
        Insert: {
          area: string
          asking_price?: number | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_budget?: number | null
          id?: string
          property_type: Database["public"]["Enums"]["property_type"]
          qualification_notes?: string | null
          size_sqm?: number | null
          source: string
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
        }
        Update: {
          area?: string
          asking_price?: number | null
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          estimated_budget?: number | null
          id?: string
          property_type?: Database["public"]["Enums"]["property_type"]
          qualification_notes?: string | null
          size_sqm?: number | null
          source?: string
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ll_projects: {
        Row: {
          actual_end_date: string | null
          code: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          planned_end_date: string | null
          property_id: string | null
          spv_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          tier: Database["public"]["Enums"]["project_tier"]
          total_budget: number | null
          updated_at: string | null
        }
        Insert: {
          actual_end_date?: string | null
          code: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          planned_end_date?: string | null
          property_id?: string | null
          spv_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tier?: Database["public"]["Enums"]["project_tier"]
          total_budget?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_end_date?: string | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          planned_end_date?: string | null
          property_id?: string | null
          spv_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tier?: Database["public"]["Enums"]["project_tier"]
          total_budget?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ll_projects_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "ll_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ll_projects_spv_id_fkey"
            columns: ["spv_id"]
            isOneToOne: false
            referencedRelation: "ll_spvs"
            referencedColumns: ["id"]
          },
        ]
      }
      ll_properties: {
        Row: {
          address: string
          area: string
          building: string | null
          constraints_notes: string | null
          created_at: string | null
          created_by: string | null
          id: string
          property_type: Database["public"]["Enums"]["property_type"]
          size_sqm: number | null
          updated_at: string | null
          view_rating: number | null
        }
        Insert: {
          address: string
          area: string
          building?: string | null
          constraints_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          property_type: Database["public"]["Enums"]["property_type"]
          size_sqm?: number | null
          updated_at?: string | null
          view_rating?: number | null
        }
        Update: {
          address?: string
          area?: string
          building?: string | null
          constraints_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          property_type?: Database["public"]["Enums"]["property_type"]
          size_sqm?: number | null
          updated_at?: string | null
          view_rating?: number | null
        }
        Relationships: []
      }
      ll_spvs: {
        Row: {
          bank_account: string | null
          created_at: string | null
          id: string
          jurisdiction: string
          name: string
        }
        Insert: {
          bank_account?: string | null
          created_at?: string | null
          id?: string
          jurisdiction: string
          name: string
        }
        Update: {
          bank_account?: string | null
          created_at?: string | null
          id?: string
          jurisdiction?: string
          name?: string
        }
        Relationships: []
      }
      marketing_analytics: {
        Row: {
          campaign_name: string | null
          channel: string
          clicks: number | null
          conversions: number | null
          cost: number | null
          created_at: string | null
          date: string
          id: string
          impressions: number | null
          recorded_at: string | null
          revenue: number | null
          roas: number | null
        }
        Insert: {
          campaign_name?: string | null
          channel: string
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          date: string
          id?: string
          impressions?: number | null
          recorded_at?: string | null
          revenue?: number | null
          roas?: number | null
        }
        Update: {
          campaign_name?: string | null
          channel?: string
          clicks?: number | null
          conversions?: number | null
          cost?: number | null
          created_at?: string | null
          date?: string
          id?: string
          impressions?: number | null
          recorded_at?: string | null
          revenue?: number | null
          roas?: number | null
        }
        Relationships: []
      }
      marketing_campaigns: {
        Row: {
          budget: number | null
          campaign_type: string
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          metrics: Json | null
          name: string
          start_date: string | null
          status: string
          target_audience: string | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          campaign_type: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name: string
          start_date?: string | null
          status?: string
          target_audience?: string | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          campaign_type?: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          metrics?: Json | null
          name?: string
          start_date?: string | null
          status?: string
          target_audience?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          group_id: string | null
          id: string
          message_type: string
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          content: string
          created_at?: string
          group_id?: string | null
          id?: string
          message_type?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          group_id?: string | null
          id?: string
          message_type?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string
          email_notifications: boolean | null
          id: string
          notification_types: Json | null
          push_notifications: boolean | null
          sms_notifications: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          notification_types?: Json | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_notifications?: boolean | null
          id?: string
          notification_types?: Json | null
          push_notifications?: boolean | null
          sms_notifications?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      opportunities: {
        Row: {
          contact_info: Json | null
          created_at: string
          created_by: string | null
          deadline: string | null
          description: string | null
          documents: Json | null
          expected_roi: number | null
          id: string
          investment_required: number | null
          location: string
          opportunity_type: string
          risk_rating: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          documents?: Json | null
          expected_roi?: number | null
          id?: string
          investment_required?: number | null
          location: string
          opportunity_type: string
          risk_rating?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          documents?: Json | null
          expected_roi?: number | null
          id?: string
          investment_required?: number | null
          location?: string
          opportunity_type?: string
          risk_rating?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      opportunity_investor_process: {
        Row: {
          assigned_to: string | null
          created_at: string
          current_stage: string
          id: string
          investor_email: string
          investor_name: string | null
          notes: string | null
          opportunity_id: string
          stage_history: Json | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          current_stage?: string
          id?: string
          investor_email: string
          investor_name?: string | null
          notes?: string | null
          opportunity_id: string
          stage_history?: Json | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          current_stage?: string
          id?: string
          investor_email?: string
          investor_name?: string | null
          notes?: string | null
          opportunity_id?: string
          stage_history?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_investor_process_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "opportunity_investor_process_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunity_share_analytics: {
        Row: {
          action_data: Json | null
          action_type: string
          created_at: string
          id: string
          ip_address: unknown | null
          share_id: string
          user_agent: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          share_id: string
          user_agent?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          share_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_share_analytics_share_id_fkey"
            columns: ["share_id"]
            isOneToOne: false
            referencedRelation: "opportunity_shares"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunity_shares: {
        Row: {
          created_at: string
          id: string
          opportunity_id: string
          share_message: string | null
          share_method: string
          shared_by: string
          shared_with_email: string
          shared_with_name: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          opportunity_id: string
          share_message?: string | null
          share_method?: string
          shared_by: string
          shared_with_email: string
          shared_with_name?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          opportunity_id?: string
          share_message?: string | null
          share_method?: string
          shared_by?: string
          shared_with_email?: string
          shared_with_name?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_shares_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunity_shares_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_costs: {
        Row: {
          actual_cost: number | null
          category: string
          created_at: string
          created_by: string | null
          description: string
          estimated_cost: number
          id: string
          project_id: string
          status: string
          updated_at: string
          vendor: string | null
        }
        Insert: {
          actual_cost?: number | null
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          estimated_cost: number
          id?: string
          project_id: string
          status?: string
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          actual_cost?: number | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          estimated_cost?: number
          id?: string
          project_id?: string
          status?: string
          updated_at?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_costs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "project_costs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_risks: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          impact_score: number | null
          mitigation_plan: string | null
          probability: number | null
          project_id: string
          risk_level: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          impact_score?: number | null
          mitigation_plan?: string | null
          probability?: number | null
          project_id: string
          risk_level: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          impact_score?: number | null
          mitigation_plan?: string | null
          probability?: number | null
          project_id?: string
          risk_level?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_risks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "project_risks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "project_risks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_cost: number | null
          budget: number | null
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          manager_id: string | null
          name: string
          project_type: string
          property_id: string | null
          roi_percentage: number | null
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          actual_cost?: number | null
          budget?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          manager_id?: string | null
          name: string
          project_type: string
          property_id?: string | null
          roi_percentage?: number | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          actual_cost?: number | null
          budget?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          project_type?: string
          property_id?: string | null
          roi_percentage?: number | null
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "projects_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "projects_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string | null
          area_sqft: number | null
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          created_by: string | null
          description: string | null
          features: Json | null
          id: string
          images: Json | null
          location: string
          price: number
          property_type: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          area_sqft?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          images?: Json | null
          location: string
          price: number
          property_type: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          area_sqft?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          features?: Json | null
          id?: string
          images?: Json | null
          location?: string
          price?: number
          property_type?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          referral_type: string
          referred_email: string
          referred_name: string
          referred_phone: string | null
          referrer_id: string
          reward_amount: number | null
          reward_status: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          referral_type: string
          referred_email: string
          referred_name: string
          referred_phone?: string | null
          referrer_id: string
          reward_amount?: number | null
          reward_status?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          referral_type?: string
          referred_email?: string
          referred_name?: string
          referred_phone?: string | null
          referrer_id?: string
          reward_amount?: number | null
          reward_status?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          created_at: string | null
          details: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          severity: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          severity?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      submission_rate_limits: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          submission_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address: unknown
          submission_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          submission_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      system_analytics: {
        Row: {
          category: string
          id: string
          metadata: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at: string
        }
        Insert: {
          category: string
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_type: string
          metric_value: number
          recorded_at?: string
        }
        Update: {
          category?: string
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          metric_value?: number
          recorded_at?: string
        }
        Relationships: []
      }
      traffic_analytics: {
        Row: {
          avg_session_duration: number | null
          bounce_rate: number | null
          campaign: string | null
          created_at: string | null
          date: string
          id: string
          medium: string | null
          new_users: number | null
          pages_per_session: number | null
          recorded_at: string | null
          sessions: number | null
          sessions_per_user: number | null
          source: string
          users: number | null
        }
        Insert: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          campaign?: string | null
          created_at?: string | null
          date: string
          id?: string
          medium?: string | null
          new_users?: number | null
          pages_per_session?: number | null
          recorded_at?: string | null
          sessions?: number | null
          sessions_per_user?: number | null
          source: string
          users?: number | null
        }
        Update: {
          avg_session_duration?: number | null
          bounce_rate?: number | null
          campaign?: string | null
          created_at?: string | null
          date?: string
          id?: string
          medium?: string | null
          new_users?: number | null
          pages_per_session?: number | null
          recorded_at?: string | null
          sessions?: number | null
          sessions_per_user?: number | null
          source?: string
          users?: number | null
        }
        Relationships: []
      }
      user_activity_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource: string | null
          resource_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          resource_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          resource_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_permissions: {
        Row: {
          created_at: string
          expires_at: string | null
          granted_at: string
          granted_by: string | null
          id: string
          is_active: boolean
          permissions: string[]
          resource: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          permissions?: string[]
          resource: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          permissions?: string[]
          resource?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_submissions: {
        Row: {
          admin_notes: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          message: string | null
          name: string
          phone: string | null
          requested_role: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submission_data: Json | null
          submission_type: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          message?: string | null
          name: string
          phone?: string | null
          requested_role?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submission_data?: Json | null
          submission_type: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          message?: string | null
          name?: string
          phone?: string | null
          requested_role?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submission_data?: Json | null
          submission_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      website_analytics: {
        Row: {
          bounce_rate: number | null
          created_at: string | null
          date: string
          id: string
          page_views: number
          recorded_at: string | null
          session_duration: number | null
          unique_visitors: number
          visitors: number
        }
        Insert: {
          bounce_rate?: number | null
          created_at?: string | null
          date: string
          id?: string
          page_views?: number
          recorded_at?: string | null
          session_duration?: number | null
          unique_visitors?: number
          visitors?: number
        }
        Update: {
          bounce_rate?: number | null
          created_at?: string | null
          date?: string
          id?: string
          page_views?: number
          recorded_at?: string | null
          session_duration?: number | null
          unique_visitors?: number
          visitors?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_permission: {
        Args: {
          permission_type: string
          resource_name: string
          user_uuid: string
        }
        Returns: boolean
      }
      cleanup_rate_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: string
      }
      is_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
      log_security_event: {
        Args: {
          p_details?: Json
          p_event_type: string
          p_severity?: string
          p_user_id?: string
        }
        Returns: undefined
      }
      promote_to_admin: {
        Args: { user_email: string }
        Returns: undefined
      }
      track_submission_rate_limit: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      lead_status: "new" | "qualified" | "go_decision" | "no_go" | "converted"
      project_status:
        | "planning"
        | "design"
        | "procurement"
        | "execution"
        | "furnishing"
        | "listing"
        | "completed"
        | "cancelled"
      project_tier: "lite" | "standard" | "premium"
      property_type: "apartment" | "villa" | "townhouse" | "commercial" | "land"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      lead_status: ["new", "qualified", "go_decision", "no_go", "converted"],
      project_status: [
        "planning",
        "design",
        "procurement",
        "execution",
        "furnishing",
        "listing",
        "completed",
        "cancelled",
      ],
      project_tier: ["lite", "standard", "premium"],
      property_type: ["apartment", "villa", "townhouse", "commercial", "land"],
    },
  },
} as const
