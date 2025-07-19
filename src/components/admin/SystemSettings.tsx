import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Zap,
  Bell,
  Lock,
  Globe,
  Server,
  Key,
  Workflow,
  Save,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SystemConfig {
  general: {
    companyName: string;
    companyEmail: string;
    timezone: string;
    currency: string;
    language: string;
    maintenanceMode: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    passwordExpiry: number;
    sessionTimeout: number;
    ipWhitelist: string[];
    auditLogging: boolean;
  };
  integrations: {
    dldApiEnabled: boolean;
    dldApiKey: string;
    emailProvider: string;
    smsProvider: string;
    paymentGateway: string;
    backupFrequency: string;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    webhookUrl: string;
    notificationTypes: {
      userRegistration: boolean;
      projectUpdates: boolean;
      paymentAlerts: boolean;
      systemAlerts: boolean;
    };
  };
  automation: {
    autoAssignProjects: boolean;
    autoKycReminders: boolean;
    autoReporting: boolean;
    workflowEngine: boolean;
    aiInsights: boolean;
  };
}

const defaultConfig: SystemConfig = {
  general: {
    companyName: 'Luxury Labs Real Estate',
    companyEmail: 'admin@luxurylabs.com',
    timezone: 'Asia/Dubai',
    currency: 'AED',
    language: 'en',
    maintenanceMode: false
  },
  security: {
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 480,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    auditLogging: true
  },
  integrations: {
    dldApiEnabled: true,
    dldApiKey: 'dld_api_key_xxxxx',
    emailProvider: 'sendgrid',
    smsProvider: 'twilio',
    paymentGateway: 'stripe',
    backupFrequency: 'daily'
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    webhookUrl: 'https://api.luxurylabs.com/webhooks',
    notificationTypes: {
      userRegistration: true,
      projectUpdates: true,
      paymentAlerts: true,
      systemAlerts: true
    }
  },
  automation: {
    autoAssignProjects: true,
    autoKycReminders: true,
    autoReporting: true,
    workflowEngine: true,
    aiInsights: false
  }
};

export function SystemSettings() {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateConfig = (section: keyof SystemConfig, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNotificationType = (type: keyof SystemConfig['notifications']['notificationTypes'], value: boolean) => {
    setConfig(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        notificationTypes: {
          ...prev.notifications.notificationTypes,
          [type]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "System configuration has been updated successfully.",
      });
      setHasChanges(false);
    }, 1000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "Configuration has been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Configure platform settings, integrations, and automation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Workflow className="h-4 w-4" />
            Automation
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Configuration
              </CardTitle>
              <CardDescription>
                Basic platform settings and company information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={config.general.companyName}
                    onChange={(e) => updateConfig('general', 'companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Company Email</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={config.general.companyEmail}
                    onChange={(e) => updateConfig('general', 'companyEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={config.general.timezone} 
                    onValueChange={(value) => updateConfig('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Dubai">Asia/Dubai (UTC+4)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="Asia/Singapore">Asia/Singapore (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select 
                    value={config.general.currency} 
                    onValueChange={(value) => updateConfig('general', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenanceMode"
                  checked={config.general.maintenanceMode}
                  onCheckedChange={(checked) => updateConfig('general', 'maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                {config.general.maintenanceMode && (
                  <Badge variant="destructive">System in Maintenance</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Authentication, authorization, and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="twoFactorAuth"
                    checked={config.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateConfig('security', 'twoFactorAuth', checked)}
                  />
                  <Label htmlFor="twoFactorAuth">Require Two-Factor Authentication</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auditLogging"
                    checked={config.security.auditLogging}
                    onCheckedChange={(checked) => updateConfig('security', 'auditLogging', checked)}
                  />
                  <Label htmlFor="auditLogging">Enable Audit Logging</Label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={config.security.passwordExpiry}
                    onChange={(e) => updateConfig('security', 'passwordExpiry', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={config.security.sessionTimeout}
                    onChange={(e) => updateConfig('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist (CIDR notation)</Label>
                <Textarea
                  id="ipWhitelist"
                  value={config.security.ipWhitelist.join('\n')}
                  onChange={(e) => updateConfig('security', 'ipWhitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                  placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  DLD Integration
                </CardTitle>
                <CardDescription>
                  Dubai Land Department data integration settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="dldApiEnabled"
                    checked={config.integrations.dldApiEnabled}
                    onCheckedChange={(checked) => updateConfig('integrations', 'dldApiEnabled', checked)}
                  />
                  <Label htmlFor="dldApiEnabled">Enable DLD API Integration</Label>
                  {config.integrations.dldApiEnabled && (
                    <Badge variant="default">Active</Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dldApiKey">DLD API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="dldApiKey"
                      type="password"
                      value={config.integrations.dldApiKey}
                      onChange={(e) => updateConfig('integrations', 'dldApiKey', e.target.value)}
                    />
                    <Button variant="outline">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  External Services
                </CardTitle>
                <CardDescription>
                  Third-party service integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emailProvider">Email Provider</Label>
                    <Select 
                      value={config.integrations.emailProvider} 
                      onValueChange={(value) => updateConfig('integrations', 'emailProvider', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="aws_ses">AWS SES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smsProvider">SMS Provider</Label>
                    <Select 
                      value={config.integrations.smsProvider} 
                      onValueChange={(value) => updateConfig('integrations', 'smsProvider', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="aws_sns">AWS SNS</SelectItem>
                        <SelectItem value="nexmo">Nexmo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentGateway">Payment Gateway</Label>
                    <Select 
                      value={config.integrations.paymentGateway} 
                      onValueChange={(value) => updateConfig('integrations', 'paymentGateway', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="network_international">Network International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select 
                      value={config.integrations.backupFrequency} 
                      onValueChange={(value) => updateConfig('integrations', 'backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emailNotifications"
                    checked={config.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateConfig('notifications', 'emailNotifications', checked)}
                  />
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="smsNotifications"
                    checked={config.notifications.smsNotifications}
                    onCheckedChange={(checked) => updateConfig('notifications', 'smsNotifications', checked)}
                  />
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pushNotifications"
                    checked={config.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateConfig('notifications', 'pushNotifications', checked)}
                  />
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  value={config.notifications.webhookUrl}
                  onChange={(e) => updateConfig('notifications', 'webhookUrl', e.target.value)}
                  placeholder="https://your-app.com/webhooks"
                />
              </div>

              <div className="space-y-4">
                <Label>Notification Types</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="userRegistration"
                      checked={config.notifications.notificationTypes.userRegistration}
                      onCheckedChange={(checked) => updateNotificationType('userRegistration', checked)}
                    />
                    <Label htmlFor="userRegistration">User Registration</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="projectUpdates"
                      checked={config.notifications.notificationTypes.projectUpdates}
                      onCheckedChange={(checked) => updateNotificationType('projectUpdates', checked)}
                    />
                    <Label htmlFor="projectUpdates">Project Updates</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="paymentAlerts"
                      checked={config.notifications.notificationTypes.paymentAlerts}
                      onCheckedChange={(checked) => updateNotificationType('paymentAlerts', checked)}
                    />
                    <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="systemAlerts"
                      checked={config.notifications.notificationTypes.systemAlerts}
                      onCheckedChange={(checked) => updateNotificationType('systemAlerts', checked)}
                    />
                    <Label htmlFor="systemAlerts">System Alerts</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                Automation Configuration
              </CardTitle>
              <CardDescription>
                Configure automated workflows and AI-powered features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoAssignProjects"
                    checked={config.automation.autoAssignProjects}
                    onCheckedChange={(checked) => updateConfig('automation', 'autoAssignProjects', checked)}
                  />
                  <Label htmlFor="autoAssignProjects">Auto-assign Projects to Managers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoKycReminders"
                    checked={config.automation.autoKycReminders}
                    onCheckedChange={(checked) => updateConfig('automation', 'autoKycReminders', checked)}
                  />
                  <Label htmlFor="autoKycReminders">Auto KYC Reminders</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoReporting"
                    checked={config.automation.autoReporting}
                    onCheckedChange={(checked) => updateConfig('automation', 'autoReporting', checked)}
                  />
                  <Label htmlFor="autoReporting">Automated Reporting</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="workflowEngine"
                    checked={config.automation.workflowEngine}
                    onCheckedChange={(checked) => updateConfig('automation', 'workflowEngine', checked)}
                  />
                  <Label htmlFor="workflowEngine">Workflow Engine</Label>
                  {config.automation.workflowEngine && (
                    <Badge variant="default">Advanced</Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="aiInsights"
                    checked={config.automation.aiInsights}
                    onCheckedChange={(checked) => updateConfig('automation', 'aiInsights', checked)}
                  />
                  <Label htmlFor="aiInsights">AI-Powered Insights</Label>
                  {config.automation.aiInsights && (
                    <Badge variant="secondary">Beta</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}