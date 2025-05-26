
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ label, color, onChange }: ColorPickerProps) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      <Label className="text-sm font-semibold text-gray-700">{label}</Label>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg sm:rounded-xl border-2 border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200"
          />
          <div className="absolute inset-0 rounded-lg sm:rounded-xl ring-2 ring-white shadow-lg pointer-events-none"></div>
        </div>
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};
