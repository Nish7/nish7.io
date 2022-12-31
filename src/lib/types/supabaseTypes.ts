export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			Bookmark: {
				Row: {
					id: number;
					created_at: string;
					name: string;
					description: string | null;
					link: string;
					type: string;
				};
				Insert: {
					id?: number;
					created_at?: string;
					name: string;
					description?: string | null;
					link: string;
					type: string;
				};
				Update: {
					id?: number;
					created_at?: string;
					name?: string;
					description?: string | null;
					link?: string;
					type?: string;
				};
			};
			Education: {
				Row: {
					id: number;
					created_at: string | null;
					place: string;
					degree: string;
					start_date: string;
					end_date: string;
					current: boolean;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					place: string;
					degree: string;
					start_date: string;
					end_date: string;
					current: boolean;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					place?: string;
					degree?: string;
					start_date?: string;
					end_date?: string;
					current?: boolean;
				};
			};
			Gear: {
				Row: {
					created_at: string | null;
					link: string | null;
					name: string | null;
					description: string | null;
					type: string | null;
					logo_image: string | null;
					id: string | null;
				};
				Insert: {
					created_at?: string | null;
					link?: string | null;
					name?: string | null;
					description?: string | null;
					type?: string | null;
					logo_image?: string | null;
					id?: string | null;
				};
				Update: {
					created_at?: string | null;
					link?: string | null;
					name?: string | null;
					description?: string | null;
					type?: string | null;
					logo_image?: string | null;
					id?: string | null;
				};
			};
			Post: {
				Row: {
					id: string;
					title: string | null;
					created_at: string | null;
					reading_time: number | null;
					slug: string | null;
					blog_link: string | null;
				};
				Insert: {
					id: string;
					title?: string | null;
					created_at?: string | null;
					reading_time?: number | null;
					slug?: string | null;
					blog_link?: string | null;
				};
				Update: {
					id?: string;
					title?: string | null;
					created_at?: string | null;
					reading_time?: number | null;
					slug?: string | null;
					blog_link?: string | null;
				};
			};
			Stack: {
				Row: {
					id: number;
					created_at: string | null;
					name: string | null;
					level: number | null;
					description: string | null;
					type: string | null;
					link: string | null;
					logo_image: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					name?: string | null;
					level?: number | null;
					description?: string | null;
					type?: string | null;
					link?: string | null;
					logo_image?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					name?: string | null;
					level?: number | null;
					description?: string | null;
					type?: string | null;
					link?: string | null;
					logo_image?: string | null;
				};
			};
			Work: {
				Row: {
					id: number;
					created_at: string | null;
					name: string;
					role: string;
					start_date: string;
					end_date: string | null;
					place: string | null;
					current: boolean;
					Description: string | null;
				};
				Insert: {
					id?: number;
					created_at?: string | null;
					name: string;
					role: string;
					start_date: string;
					end_date?: string | null;
					place?: string | null;
					current: boolean;
					Description?: string | null;
				};
				Update: {
					id?: number;
					created_at?: string | null;
					name?: string;
					role?: string;
					start_date?: string;
					end_date?: string | null;
					place?: string | null;
					current?: boolean;
					Description?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
