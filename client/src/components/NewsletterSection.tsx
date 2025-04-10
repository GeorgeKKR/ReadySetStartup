import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Form schema
const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const NewsletterSection: React.FC = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    setSubmitting(true);
    try {
      const response = await apiRequest('POST', '/api/newsletter/subscribe', data);
      if (response.ok) {
        toast({
          title: "Subscription successful",
          description: "Thank you for subscribing to our newsletter!",
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to receive exclusive content, business insights, and be the first to know about casting opportunities for future seasons.</p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        placeholder="Your email address" 
                        className="bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white h-12" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="bg-white text-accent hover:bg-neutral-200 transition-colors py-3 px-6 rounded-lg font-bold h-12"
                disabled={submitting}
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </Form>
          
          <p className="mt-4 text-sm text-neutral/80">
            By subscribing, you agree to our <a href="#terms" className="underline">Terms & Conditions</a> and <a href="#privacy" className="underline">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
