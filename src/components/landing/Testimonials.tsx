import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "This app has completely transformed how I preserve my family's memories. It's intuitive and beautiful.",
    author: "Sarah Johnson",
    role: "Professional Photographer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    content: "The best platform I've found for organizing and sharing memories with my loved ones. Simply amazing!",
    author: "Michael Chen",
    role: "Family Historian",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  {
    content: "Outstanding service! The timeline feature makes it so easy to relive our precious moments.",
    author: "Emma Thompson",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Loved by thousands
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            See what our users have to say about their experience
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-lg text-gray-300">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}