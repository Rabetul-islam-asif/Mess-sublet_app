"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Upload, MapPin, Check, Home, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 'basics', title: 'Basic Info' },
  { id: 'location', title: 'Location' },
  { id: 'details', title: 'Details' },
  { id: 'preferences', title: 'Restrictions' },
  { id: 'media', title: 'Photos' },
];

interface PostData {
  tenantType: string;
  rent: string;
  availableFrom: string;
  area: string;
  address: string;
  floor: string;
  facilities: string[];
  restrictions: string[];
  description: string;
  images: string[];
  contact: string;
}

interface PostFormProps {
  initialData?: Partial<PostData>;
  isEditing?: boolean;
}

export const PostForm = ({ initialData, isEditing = false }: PostFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PostData>({
    tenantType: 'Bachelor Male',
    rent: '',
    availableFrom: '',
    area: '',
    address: '',
    floor: '',
    facilities: [] as string[],
    restrictions: [] as string[],
    description: '',
    images: [],
    contact: '',
    ...initialData,
  });
  const [customRestriction, setCustomRestriction] = useState('');

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const facilityOptions = ['Gas', 'Electricity', 'Wi-Fi', 'Balcony', 'Rooftop', 'Lift', 'Security'];

  const toggleFacility = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const toggleRestriction = (restriction: string) => {
    setFormData(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  const addCustomRestriction = () => {
    if (customRestriction.trim() && !formData.restrictions.includes(customRestriction.trim())) {
      setFormData(prev => ({
        ...prev,
        restrictions: [...prev.restrictions, customRestriction.trim()]
      }));
      setCustomRestriction('');
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages = [...(formData.images || [])];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('image', file);

        // ImgBB Upload
        const response = await fetch('https://api.imgbb.com/1/upload?key=659c558f44d89bffc201c4e258836605', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          newImages.push(data.data.url);
        }
      }
      
      setFormData(prev => ({ ...prev, images: newImages }));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">Tenant Type</label>
              <div className="grid grid-cols-3 gap-3">
                {['Bachelor Male', 'Bachelor Female', 'Small Family'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, tenantType: type })}
                    className={`rounded-xl border p-3 text-sm font-medium transition-all ${
                      formData.tenantType === type
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Monthly Rent (BDT)"
              type="number"
              placeholder="e.g. 5000"
              value={formData.rent}
              onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            />

            <Input
              label="Available From"
              type="month"
              value={formData.availableFrom}
              onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
            />

            <Input
              label="Contact Number"
              type="tel"
              placeholder="e.g. 01712345678"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <Input
              label="Area / Neighborhood"
              placeholder="e.g. Mohammadpur"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Address (House, Road)"
                placeholder="House 12, Road 4..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <Input
                label="Floor Level"
                placeholder="e.g. 5th Floor"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
              />
            </div>
            <div className="h-48 w-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <MapPin className="mr-2 h-5 w-5" /> Google Map Placeholder
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Facilities Included</label>
              <div className="grid grid-cols-2 gap-3">
                {facilityOptions.map((facility) => (
                  <div
                    key={facility}
                    onClick={() => toggleFacility(facility)}
                    className={`flex cursor-pointer items-center rounded-lg border p-3 transition-all ${
                      formData.facilities.includes(facility)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`mr-3 flex h-5 w-5 items-center justify-center rounded border ${
                      formData.facilities.includes(facility)
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-slate-400'
                    }`}>
                      {formData.facilities.includes(facility) && <Check className="h-3 w-3" />}
                    </div>
                    <span className="text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
           <div className="space-y-6">
             <div className="space-y-3">
               <label className="block text-sm font-medium text-slate-700">Restrictions & Preferences</label>
               <p className="text-xs text-slate-500">Select any specific requirements for your potential tenant.</p>
               <div className="grid grid-cols-2 gap-3">
                 {['Muslim Only', 'Hindu Only', 'Christian Only', 'Family Only', 'Student Only', 'Non-Smoker', 'No Pets', 'No Late Entry'].map((res) => (
                   <div
                     key={res}
                     onClick={() => toggleRestriction(res)}
                     className={`flex cursor-pointer items-center rounded-lg border p-3 transition-all ${
                       formData.restrictions.includes(res)
                         ? 'border-amber-500 bg-amber-50 text-amber-700'
                         : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                     }`}
                   >
                     <div className={`mr-3 flex h-5 w-5 items-center justify-center rounded border ${
                       formData.restrictions.includes(res)
                         ? 'border-amber-500 bg-amber-500 text-white'
                         : 'border-slate-400'
                     }`}>
                       {formData.restrictions.includes(res) && <Check className="h-3 w-3" />}
                     </div>
                     <span className="text-sm">{res}</span>
                   </div>
                 ))}
               </div>
               
               <div className="mt-4">
                 <label className="mb-2 block text-sm font-medium text-slate-700">Add Custom Restriction</label>
                 <div className="flex gap-2">
                   <Input 
                     placeholder="e.g. No loud music" 
                     value={customRestriction}
                     onChange={(e) => setCustomRestriction(e.target.value)}
                     className="flex-1"
                   />
                   <Button type="button" onClick={addCustomRestriction} variant="outline" className="h-12 w-24">
                     Add
                   </Button>
                 </div>
               </div>
             </div>
           </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center hover:bg-slate-50 transition-colors">
              <Upload className="mx-auto mb-4 h-10 w-10 text-slate-400" />
              <h3 className="text-sm font-medium text-slate-700">Upload Photos</h3>
              <p className="mt-1 text-xs text-slate-500">PNG, JPG up to 5MB</p>
              
              <div className="mt-4">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={uploading}
                >
                   {uploading ? 'Uploading...' : 'Select Files'}
                </Button>
              </div>
            </div>

            {/* Image Previews */}
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((url, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                    <img src={url} alt={`Upload ${index + 1}`} className="h-full w-full object-cover" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const router = useRouter();

  const handleSubmit = async () => {
    // Navigate to dashboard after "update" or "create"
    // In a real app, you'd await an API call here.
    console.log("Submitting form data:", formData);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <div className="mt-6 flex w-full items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    index <= currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 hidden text-xs font-medium sm:block whitespace-nowrap ${
                  index <= currentStep ? 'text-slate-900' : 'text-slate-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-2 h-[2px] min-w-[10px] flex-1 bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={currentStep === 0 ? 'invisible' : ''}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={currentStep === steps.length -1 ? handleSubmit : nextStep}>
          {currentStep === steps.length - 1 ? (isEditing ? 'Update Post' : 'Publish Post') : 'Next Step'}
          {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};
