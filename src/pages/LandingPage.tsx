import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  ArrowRight,
  Activity,
  ShieldCheck,
  BarChart3,
  Users,
  BookOpen,
  Package } from
'lucide-react';
import { Button } from '../components/ui/Button';
export function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-main font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-primary">AgriTrack</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-text-secondary hover:text-primary font-medium">

              Features
            </a>
            <a
              href="#about"
              className="text-text-secondary hover:text-primary font-medium">

              About
            </a>
            <a
              href="#contact"
              className="text-text-secondary hover:text-primary font-medium">

              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-primary font-medium hover:text-primary-dark">

              Login
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Trusted by 500+ Botswana Farmers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
              Modern Livestock Management for{' '}
              <span className="text-primary">Botswana Farmers</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-lg">
              Simplify your farm operations with our all-in-one digital
              solution. Track livestock, manage health records, and optimize
              inventory with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto">

                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl opacity-50"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-700">247</div>
                  <div className="text-sm text-green-600">Total Livestock</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-orange-700">12</div>
                  <div className="text-sm text-orange-600">
                    Vaccinations Due
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) =>
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">

                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                      <Activity size={20} />
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-gray-200 rounded mb-1.5"></div>
                      <div className="h-2 w-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-light font-medium">
                Farmers Registered
              </div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-primary-light font-medium">
                Livestock Tracked
              </div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-light font-medium">
                Vaccinations Logged
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-text-secondary text-lg">
              Designed specifically for the unique challenges of farming in
              Botswana, providing you with the tools to grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            {
              icon: <Activity className="w-6 h-6" />,
              title: 'Livestock Tracking',
              desc: 'Keep detailed records of every animal, including breed, age, weight, and lineage.'
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: 'Health Records',
              desc: 'Track diseases, treatments, and vet visits to ensure herd health and compliance.'
            },
            {
              icon: <Leaf className="w-6 h-6" />,
              title: 'Vaccination Schedules',
              desc: 'Never miss a vaccination with automated reminders and scheduling tools.'
            },
            {
              icon: <Package className="w-6 h-6" />,
              title: 'Inventory Management',
              desc: 'Monitor feed, medicine, and equipment stock levels to prevent shortages.'
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: 'Reports & Analytics',
              desc: 'Generate professional reports for loans, grants, or performance analysis.'
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: 'Training Resources',
              desc: 'Access a library of farming best practices and government program info.'
            }].
            map((feature, idx) =>
            <div
              key={idx}
              className="p-6 rounded-xl border border-gray-100 hover:shadow-warm-lg transition-shadow duration-300 bg-bg-main/30">

                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">{feature.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-main">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
            Farmers Trust AgriTrack
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100">
              <p className="text-lg text-text-secondary italic mb-6">
                "Since using AgriTrack, I've reduced my livestock mortality rate
                by 30% because I never miss a vaccination date. It's a game
                changer for my farm in Serowe."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  KS
                </div>
                <div>
                  <div className="font-bold text-text-primary">
                    Kefilwe Seretse
                  </div>
                  <div className="text-sm text-text-secondary">
                    Cattle Farmer, Serowe
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100">
              <p className="text-lg text-text-secondary italic mb-6">
                "The inventory management feature helps me plan my feed
                purchases better. I no longer run out of supplies unexpectedly.
                Highly recommended!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  MK
                </div>
                <div>
                  <div className="font-bold text-text-primary">
                    Mpho Kgosidintsi
                  </div>
                  <div className="text-sm text-text-secondary">
                    Goat Farmer, Molepolole
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-primary">AgriTrack</span>
          </div>
          <div className="text-text-secondary text-sm">
            © {new Date().getFullYear()} AgriTrack Botswana. All rights
            reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-text-secondary hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-text-secondary hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-text-secondary hover:text-primary">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>);

}