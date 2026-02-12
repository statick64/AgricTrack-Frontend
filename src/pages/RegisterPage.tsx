import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, MapPin, Mail, Phone, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card } from '../components/ui/Card';
export function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };
  const districts = [
  {
    value: 'gaborone',
    label: 'Gaborone'
  },
  {
    value: 'francistown',
    label: 'Francistown'
  },
  {
    value: 'maun',
    label: 'Maun'
  },
  {
    value: 'kasane',
    label: 'Kasane'
  },
  {
    value: 'serowe',
    label: 'Serowe'
  },
  {
    value: 'palapye',
    label: 'Palapye'
  },
  {
    value: 'molepolole',
    label: 'Molepolole'
  },
  {
    value: 'kanye',
    label: 'Kanye'
  },
  {
    value: 'lobatse',
    label: 'Lobatse'
  },
  {
    value: 'selebi-phikwe',
    label: 'Selebi-Phikwe'
  }];

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            <Leaf size={24} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            Create Account
          </h1>
          <p className="text-text-secondary mt-2">
            Join thousands of Botswana farmers today
          </p>
        </div>

        <Card className="shadow-warm-lg">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                placeholder="Thabo Mokobi"
                icon={<User size={18} />}
                required />

              <Input
                label="Farm Name"
                placeholder="Green Valley Farm"
                icon={<Leaf size={18} />}
                required />

            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              required />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Phone Number"
                placeholder="+267 71234567"
                icon={<Phone size={18} />}
                required />

              <Select label="Location" options={districts} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                required />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={18} />}
                required />

            </div>

            <div className="flex items-start pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required />

              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-text-secondary">

                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}>

              Create Account
            </Button>
          </form>
        </Card>

        <p className="text-center mt-6 text-text-secondary">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary-dark">

            Sign in
          </Link>
        </p>
      </div>
    </div>);

}