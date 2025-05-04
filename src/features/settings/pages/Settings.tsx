
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTheme } from "@/features/theme/providers/ThemeProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const settingsFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  menuType: z.enum(["static", "overlay", "slim", "slim-plus"]),
  colorScheme: z.enum(["default", "purple", "blue", "green", "orange"]),
  layout: z.enum(["default", "compact", "wide"]),
  notifications: z.boolean(),
  analytics: z.boolean(),
  api: z.object({
    apiKey: z.string().optional(),
    endpoint: z.string().url().optional().or(z.literal("")),
  }),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      theme: theme as "light" | "dark" | "system",
      menuType: "static",
      colorScheme: "default",
      layout: "default",
      notifications: true,
      analytics: false,
      api: {
        apiKey: "",
        endpoint: "",
      },
    },
  });

  function onSubmit(data: SettingsFormValues) {
    setIsSaving(true);
    // Mock API delay
    setTimeout(() => {
      console.log(data);
      setTheme(data.theme);
      setIsSaving(false);
      toast.success("Settings saved successfully");
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure general application settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="layout"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Layout</FormLabel>
                          <FormDescription>
                            Choose the layout of your admin interface.
                          </FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a layout" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="compact">Compact</SelectItem>
                              <SelectItem value="wide">Wide</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="analytics"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Analytics</FormLabel>
                            <FormDescription>
                              Enable analytics to track site usage.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Theme</FormLabel>
                        <FormDescription>
                          Select the theme for the dashboard.
                        </FormDescription>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="light" className="sr-only" />
                              </FormControl>
                              <div className="rounded-md border-2 border-muted p-4 hover:border-accent">
                                <div className="space-y-2">
                                  <div className="h-2 w-full rounded bg-slate-100" />
                                  <div className="h-2 w-full rounded bg-slate-100" />
                                  <div className="h-2 w-full rounded bg-slate-100" />
                                </div>
                              </div>
                              <span className="block w-full p-2 text-center font-normal">Light</span>
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="dark" className="sr-only" />
                              </FormControl>
                              <div className="rounded-md border-2 border-muted p-4 hover:border-accent bg-slate-900">
                                <div className="space-y-2">
                                  <div className="h-2 w-full rounded bg-slate-700" />
                                  <div className="h-2 w-full rounded bg-slate-700" />
                                  <div className="h-2 w-full rounded bg-slate-700" />
                                </div>
                              </div>
                              <span className="block w-full p-2 text-center font-normal">Dark</span>
                            </FormLabel>
                          </FormItem>
                          
                          <FormItem>
                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                              <FormControl>
                                <RadioGroupItem value="system" className="sr-only" />
                              </FormControl>
                              <div className="rounded-md border-2 border-muted p-4 hover:border-accent">
                                <div className="flex space-x-1">
                                  <div className="w-1/2 space-y-2">
                                    <div className="h-2 w-full rounded bg-slate-100" />
                                    <div className="h-2 w-full rounded bg-slate-100" />
                                    <div className="h-2 w-full rounded bg-slate-100" />
                                  </div>
                                  <div className="w-1/2 space-y-2 bg-slate-900 p-1">
                                    <div className="h-2 w-full rounded bg-slate-700" />
                                    <div className="h-2 w-full rounded bg-slate-700" />
                                    <div className="h-2 w-full rounded bg-slate-700" />
                                  </div>
                                </div>
                              </div>
                              <span className="block w-full p-2 text-center font-normal">System</span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="menuType"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Menu Type</FormLabel>
                        <FormDescription>
                          Select the type of menu to use.
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a menu type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="static">Static</SelectItem>
                            <SelectItem value="overlay">Overlay</SelectItem>
                            <SelectItem value="slim">Slim</SelectItem>
                            <SelectItem value="slim-plus">Slim+</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="colorScheme"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Color Scheme</FormLabel>
                        <FormDescription>
                          Select the color scheme for the application.
                        </FormDescription>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a color scheme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications about important updates.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>
                    Configure advanced settings like API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="api.apiKey"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>API Key</FormLabel>
                        <FormDescription>
                          Enter your API key for external services.
                        </FormDescription>
                        <FormControl>
                          <Input 
                            placeholder="Enter API key" 
                            {...field} 
                            type="password"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="api.endpoint"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>API Endpoint</FormLabel>
                        <FormDescription>
                          Configure the API endpoint URL.
                        </FormDescription>
                        <FormControl>
                          <Input 
                            placeholder="https://api.example.com/v1" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
