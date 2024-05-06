const paths = {
	home() {
		return '/';
	},
	blogPosts() {
		return '/blog';
	},
	showBlogPost(slug: string) {
		return `/blog/${slug}`;
	},
	admin() {
		return '/admin';
	},
	adminLogin() {
		return '/admin/login';
	},
	adminAuthors() {
		return '/admin/authors';
	},
	adminAuthorCreate() {
		return '/admin/authors/create';
	},
	adminAuthorUpdate(id: string) {
		return `/admin/authors/${id}`;
	},
	adminAuthorDelete(id: string) {
		return `/admin/authors/${id}/delete`;
	},
	adminBlogPosts() {
		return '/admin/blog';
	},
	adminBlogPostCreate() {
		return '/admin/blog/create';
	},
	adminBlogPostUpdate(slug: string) {
		return `/admin/blog/${slug}`;
	},
	adminBlogPostDelete(slug: string) {
		return `/admin/blog/${slug}/delete`;
	},
	adminSettings() {
		return '/admin/settings';
	},
};

export default paths;
