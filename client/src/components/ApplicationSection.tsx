import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Rocket, LightbulbIcon, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';

// Form schema
const applicationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  description: z.string().min(50, { message: "Description must be at least 50 characters" }).max(500, { message: "Description must be less than 500 characters" }),
  sector: z.string().min(1, { message: "Please select a business sector" }),
  terms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions" })
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const ApplicationSection: React.FC = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  // Get the deadline data
  const { data: deadline } = useQuery({
    queryKey: ['/api/application/deadline'],
    queryFn: undefined
  });

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      description: "",
      sector: "",
      terms: false
    }
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setSubmitting(true);
    try {
      const response = await apiRequest('POST', '/api/applications/submit', data);
      if (response.ok) {
        toast({
          title: "Application Submitted",
          description: "Your application has been successfully submitted. We'll be in touch soon!",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="apply" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span 
              className="text-[hsl(var(--accent-secondary))] font-semibold text-sm uppercase tracking-wider"
              variants={itemVariants}
            >
              Applications Open
            </motion.span>
            
            <motion.h2 
              className="text-4xl font-display font-bold mt-2 mb-6"
              variants={itemVariants}
            >
              Ready to Launch Your Startup?
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8"
              variants={itemVariants}
            >
              We're looking for Britain's most innovative entrepreneurs for our next season. If you have a groundbreaking business idea and the drive to make it happen, we want to hear from you.
            </motion.p>
            
            <motion.div 
              className="space-y-6 mb-8"
              variants={containerVariants}
            >
              <motion.div className="flex" variants={itemVariants}>
                <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <Rocket className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Early-Stage Startups</h3>
                  <p className="text-gray-400">Have a prototype or MVP with early market validation</p>
                </div>
              </motion.div>
              
              <motion.div className="flex" variants={itemVariants}>
                <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <LightbulbIcon className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Innovative Solutions</h3>
                  <p className="text-gray-400">Solving real problems with unique approaches</p>
                </div>
              </motion.div>
              
              <motion.div className="flex" variants={itemVariants}>
                <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Strong Founding Team</h3>
                  <p className="text-gray-400">Passionate founders with complementary skills</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-primary p-6 rounded-lg border border-gray-800"
              variants={itemVariants}
            >
              <h4 className="font-bold text-lg mb-2">Application Deadline</h4>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {deadline ? (
                  <>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">{deadline.days}</div>
                      <div className="text-xs text-gray-400">Days</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">{deadline.hours}</div>
                      <div className="text-xs text-gray-400">Hours</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">{deadline.minutes}</div>
                      <div className="text-xs text-gray-400">Minutes</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">{deadline.seconds}</div>
                      <div className="text-xs text-gray-400">Seconds</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-xs text-gray-400">Days</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">08</div>
                      <div className="text-xs text-gray-400">Hours</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">45</div>
                      <div className="text-xs text-gray-400">Minutes</div>
                    </div>
                    <div className="bg-secondary p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold">22</div>
                      <div className="text-xs text-gray-400">Seconds</div>
                    </div>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-400">Applications for Season 2 close on September 30, 2023</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-primary p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Apply Now</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. Jane Smith" 
                            className="bg-secondary border border-gray-800 focus:ring-2 focus:ring-[hsl(var(--accent-secondary))]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. jane@example.com" 
                            className="bg-secondary border border-gray-800 focus:ring-2 focus:ring-[hsl(var(--accent-secondary))]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company/Startup Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. TechInnovate Ltd" 
                            className="bg-secondary border border-gray-800 focus:ring-2 focus:ring-[hsl(var(--accent-secondary))]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe Your Business (50-100 words)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your business idea, target market, and current stage..." 
                            className="bg-secondary border border-gray-800 focus:ring-2 focus:ring-[hsl(var(--accent-secondary))]" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Sector</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-secondary border border-gray-800 focus:ring-2 focus:ring-[hsl(var(--accent-secondary))]">
                              <SelectValue placeholder="Select a sector" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tech">Technology/SaaS</SelectItem>
                            <SelectItem value="ecommerce">E-commerce/Retail</SelectItem>
                            <SelectItem value="health">Health/Wellness</SelectItem>
                            <SelectItem value="fintech">FinTech</SelectItem>
                            <SelectItem value="sustainability">Sustainability</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-accent"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the <a href="#terms" className="text-[hsl(var(--accent-secondary))] hover:underline">Terms & Conditions</a> and <a href="#privacy" className="text-[hsl(var(--accent-secondary))] hover:underline">Privacy Policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-red-700 transition-colors" 
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  
                  <p className="text-xs text-center text-gray-400">
                    Our team will review your application and contact you within 2 weeks if you're selected for the next round.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;
