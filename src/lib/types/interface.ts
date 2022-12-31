import type { Database } from './supabaseTypes';

export type WorkProp = Database['public']['Tables']['Work']['Row'];
export type EducationProp = Database['public']['Tables']['Education']['Row'];
export type BookmarkProp = Database['public']['Tables']['Bookmark']['Row'];
export type GearProp = Database['public']['Tables']['Gear']['Row'];
export type PostProp = Database['public']['Tables']['Post']['Row'];
export type StackProp = Database['public']['Tables']['Stack']['Row'];

export type ProjectProp = {
	name: string;
	html_url: string;
	description: string | null;
	created_at: string | null;
	language: string | null;
	topics: string[] | undefined;
	homepage: string | null;
};
