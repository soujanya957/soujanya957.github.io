import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onTagChange }) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2">Filter by Tags</h3>
      <div className="flex flex-col">
        {tags.map((tag, index) => (
          <label key={index} className="flex items-center mb-2">
            <input 
              type="checkbox" 
              checked={selectedTags.includes(tag)} 
              onChange={() => onTagChange(tag)} 
              className="mr-2"
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
