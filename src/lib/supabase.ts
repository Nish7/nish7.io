import { createClient } from '@supabase/supabase-js';
import { BookmarkProp, EducationProp, WorkProp } from './types/interface';

class Supabase_Api {
	supabase;

	constructor() {
		this.supabase = createClient(
			process.env.SUPABASE_URL ?? '',
			process.env.SUPABASE_KEY ?? ''
		);
	}

	async fetchBookmarks() {
		return (await this.supabase.from('Bookmark').select('*'))[
			'data'
		] as any as BookmarkProp[];
	}

	async fetchEducation() {
		return (await this.supabase.from('Education').select('*'))[
			'data'
		] as any as EducationProp[];
	}

	async fetchWork() {
		return (
			await this.supabase
				.from('Work')
				.select('*')
				.order('start_date', { ascending: false })
		)['data'] as any as WorkProp[];
	}
}

export default new Supabase_Api();