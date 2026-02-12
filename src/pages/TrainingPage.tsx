import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BookOpen, ExternalLink, Clock, PlayCircle } from 'lucide-react';
const resources = [
{
  id: 1,
  title: 'Understanding Foot and Mouth Disease',
  category: 'Animal Health',
  readTime: '10 min read',
  desc: 'A comprehensive guide to identifying, preventing, and reporting FMD in Botswana.',
  image: 'bg-red-100'
},
{
  id: 2,
  title: 'Sustainable Grazing Practices',
  category: 'Farm Management',
  readTime: '15 min read',
  desc: 'Learn how to rotate grazing to prevent soil erosion and maintain pasture health.',
  image: 'bg-green-100'
},
{
  id: 3,
  title: 'BAMB Marketing Guide 2024',
  category: 'Market Info',
  readTime: '8 min read',
  desc: 'Current prices and selling requirements for the Botswana Agricultural Marketing Board.',
  image: 'bg-blue-100'
},
{
  id: 4,
  title: 'Winter Supplementation for Cattle',
  category: 'Nutrition',
  readTime: '12 min read',
  desc: 'Essential supplements to maintain cattle weight during the dry winter months.',
  image: 'bg-orange-100'
}];

export function TrainingPage() {
  return (
    <DashboardLayout title="Training & Resources">
      {/* Featured Article */}
      <div className="mb-10">
        <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl">
            <Badge className="bg-white/20 text-white border-none mb-4">
              Featured Program
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Government Livestock Improvement Scheme
            </h2>
            <p className="text-primary-light text-lg mb-6">
              Apply for subsidized breeding stock to improve your herd genetics.
              Applications open for the 2024 season.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 border-none">

              Read Full Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {[
        'All Resources',
        'Animal Health',
        'Farm Management',
        'Market Info',
        'Government Programs'].
        map((cat, idx) =>
        <button
          key={idx}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${idx === 0 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-text-secondary hover:bg-gray-50'}`}>

            {cat}
          </button>
        )}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) =>
        <Card
          key={resource.id}
          padding="none"
          className="overflow-hidden flex flex-col h-full hover:shadow-warm-lg transition-shadow">

            <div
            className={`h-48 ${resource.image} flex items-center justify-center`}>

              <BookOpen className="w-12 h-12 text-black/10" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="neutral" className="text-xs">
                  {resource.category}
                </Badge>
                <div className="flex items-center text-xs text-text-muted">
                  <Clock size={12} className="mr-1" />
                  {resource.readTime}
                </div>
              </div>
              <h3 className="font-bold text-lg text-text-primary mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4 flex-1">
                {resource.desc}
              </p>
              <Button variant="outline" size="sm" className="w-full mt-auto">
                Read Article
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>);

}