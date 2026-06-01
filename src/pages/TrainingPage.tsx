import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BookOpen, ExternalLink, Clock } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { trainingService } from '../services/trainingService';

// Map backend categories to display labels
const categoryLabels: Record<string, string> = {
  animal_health: 'Animal Health',
  farm_management: 'Farm Management',
  market_info: 'Market Info',
  nutrition: 'Nutrition',
  government_programs: 'Government Programs',
};

// Map categories to color classes for the image placeholder
const categoryColors: Record<string, string> = {
  animal_health: 'bg-red-100',
  farm_management: 'bg-green-100',
  market_info: 'bg-blue-100',
  nutrition: 'bg-orange-100',
  government_programs: 'bg-purple-100',
};

const filterCategories = [
  { value: '', label: 'All Resources' },
  { value: 'animal_health', label: 'Animal Health' },
  { value: 'farm_management', label: 'Farm Management' },
  { value: 'market_info', label: 'Market Info' },
  { value: 'government_programs', label: 'Government Programs' },
];

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Get API base URL, remove trailing slash if any
  let apiBaseUrl = (import.meta as any).env.VITE_API_URL || 'http://localhost:8000/api';
  if (apiBaseUrl.endsWith('/')) {
    apiBaseUrl = apiBaseUrl.slice(0, -1);
  }
  
  // Strip '/api' from the end to get the backend base URL
  const backendBaseUrl = apiBaseUrl.endsWith('/api') 
    ? apiBaseUrl.slice(0, -4) 
    : apiBaseUrl;
  
  // Make sure the image path has a leading slash
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${backendBaseUrl}${cleanPath}`;
};

export function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('');

  const { data: resources, isLoading, error } = useApi(
    () => trainingService.getAll(activeCategory || undefined),
    [activeCategory]
  );

  const { data: featuredResources } = useApi(
    () => trainingService.getFeatured(),
    []
  );

  const featured = featuredResources?.[0];

  return (
    <DashboardLayout title="Training & Resources">
      {/* Featured Article */}
      <div className="mb-10">
        <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden shadow-xl border border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <Badge className="bg-white/15 text-white font-bold uppercase tracking-wider text-xs border border-white/10 px-3.5 py-1 mb-4 shadow-sm">
                Featured Program
              </Badge>
              <h2 className="text-3.5xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
                {featured?.title || 'Government Livestock Improvement Scheme'}
              </h2>
              <p className="text-emerald-50/90 text-lg mb-8 leading-relaxed font-normal">
                {featured?.description ||
                  'Apply for subsidized breeding stock to improve your herd genetics. Applications open for the 2024 season.'}
              </p>
              
              {featured?.external_link ? (
                <a
                  href={featured.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-accent-light px-6 py-3.5 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 outline-none">
                  Read Full Guide <ExternalLink size={16} />
                </a>
              ) : (
                <button
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white hover:bg-accent-light px-6 py-3.5 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 outline-none">
                  Read Full Guide
                </button>
              )}
            </div>
            
            {/* Featured Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                {featured?.featured_image ? (
                  <img
                    src={getImageUrl(featured.featured_image)}
                    alt={featured.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <BookOpen className="w-20 h-20 text-white/20" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {filterCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === cat.value
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-text-secondary hover:bg-gray-50'
              }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-text-secondary">Loading resources...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(resources ?? []).map((resource) => (
            <Card
              key={resource.id}
              padding="none"
              className="overflow-hidden flex flex-col h-full hover:shadow-warm-lg transition-shadow">
              <div
                className={`h-48 ${categoryColors[resource.category] || 'bg-gray-100'
                  } flex items-center justify-center`}>
                {resource.featured_image ? (
                  <img
                    src={getImageUrl(resource.featured_image)}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="w-12 h-12 text-black/10" />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="neutral" className="text-xs">
                    {categoryLabels[resource.category] || resource.category}
                  </Badge>
                  <div className="flex items-center text-xs text-text-muted">
                    <Clock size={12} className="mr-1" />
                    {resource.read_time} min read
                  </div>
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 flex-1">
                  {resource.description}
                </p>
                <Button variant="outline" size="sm" className="w-full mt-auto">
                  {resource.external_link ? (
                    <a
                      href={resource.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1">
                      Open Link <ExternalLink size={14} />
                    </a>
                  ) : (
                    'Read Article'
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}