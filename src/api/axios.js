// ---------------------------------------------------------------------------
// LOCAL MOCK API — no backend required.
//
// This file mimics the same axios interface (api.get/post/put/delete) that
// every page in this app already uses, but reads/writes localStorage instead
// of hitting a real server. Swap this file out for the real axios instance
// (see /server in the full-stack version of this project) whenever you're
// ready to connect a real database.
//
// Default admin login: admin@marjanclassic.com / admin123
// (change these in the DEFAULT_ADMIN object below)
//
// IMPORTANT — local image paths (e.g. '/FinalCloseup.jpeg'):
// These only resolve if the actual file lives in `client/public/`, e.g.
// client/public/FinalCloseup.jpeg. Vite serves everything inside `public/`
// from the site root, so the path in code must match the filename exactly
// (including capitalization and extension).
// ---------------------------------------------------------------------------

const DELAY = 250; // simulated network delay, ms

// Bump this any time you change the seed data below (new image paths, new
// sample content, etc). Seeding only ever writes to localStorage once per
// version — without this, a browser that already loaded the site keeps
// serving whatever was seeded the first time, and edits here appear to do
// nothing. Changing this string forces a one-time refresh of the demo data.
const SEED_VERSION = '2';

const DEFAULT_ADMIN = { email: 'admin@marjanclassic.com', password: 'admin123', name: 'Admin' };

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const slugify = (text) =>
  (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// --- Seed data (only runs once per SEED_VERSION) ---------------------------

// NOTE: IMG.mall below is missing a file extension ('/CompanyIntro' — no
// .jpg/.jpeg/.png). That will 404 no matter what. Update it to match your
// actual filename in client/public/, e.g. '/CompanyIntro.jpeg'.
const IMG = {
  tower: '/FinalCloseup.jpeg',
  mall: '/CompanyIntro', // ← fix this: add the real file extension
  interior: '/PASSAGE.jpeg',
  lobby: '/RECEPTION.jpg.jpeg', // ← double-check this one too, looks like it may have an accidental double extension
  night: '/LIFT.jpeg',
  site: '/Upper.jpeg',
};

const seedIfEmpty = () => {
  // Reseed whenever SEED_VERSION changes, so edits to IMG/content above
  // actually show up instead of being shadowed by old localStorage data.
  const storedVersion = localStorage.getItem('db_seed_version');
  if (storedVersion !== SEED_VERSION) {
    ['db_projects', 'db_blogs', 'db_gallery', 'db_careers', 'db_banners', 'db_offer'].forEach((k) =>
      localStorage.removeItem(k)
    );
    localStorage.setItem('db_seed_version', SEED_VERSION);
  }

  if (!localStorage.getItem('db_admin')) write('db_admin', DEFAULT_ADMIN);

  if (!localStorage.getItem('db_projects')) {
    const now = new Date().toISOString();
    write('db_projects', [
      {
        _id: uid(),
        title: 'Marjan Classic Residency',
        slug: 'marjan-classic-residency',
        category: 'Residential',
        status: 'Under Construction',
        location: 'Sector 16-A, Shah Latif Town, Karachi',
        shortDescription: 'Modern apartment towers with skyline views and resort-style amenities.',
        description:
          'Marjan Classic Residency offers thoughtfully designed 2, 3, and 4 bedroom apartments in the heart of Sector 16-A. Every unit is built for natural light, cross-ventilation, and long-term value.',
        coverImage: IMG.tower,
        gallery: [IMG.lobby, IMG.night, IMG.interior],
        startDate: 'Jan 2024',
        completionDate: 'Dec 2026',
        totalUnits: 320,
        floors: 22,
        amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Covered Parking', 'Kids Play Area', 'Backup Generator'],
        priceStartingFrom: 'PKR 1.2 Crore',
        featured: true,
        createdAt: now,
      },
      {
        _id: uid(),
        title: 'Marjan Classic Mall',
        slug: 'marjan-classic-mall',
        category: 'Commercial',
        status: 'Completed',
        location: 'Sector 16-A, Shah Latif Town, Karachi',
        shortDescription: 'A retail and lifestyle destination anchoring the Marjan Classic development.',
        description:
          'A four-floor retail mall featuring flagship stores, a food court, and a multiplex cinema — designed to be the commercial heart of Sector 16-A.',
        coverImage: IMG.mall,
        gallery: [IMG.interior, IMG.night],
        startDate: 'Mar 2021',
        completionDate: 'Aug 2024',
        totalUnits: 180,
        floors: 4,
        amenities: ['Food Court', 'Multiplex Cinema', 'Ample Parking', 'Central AC', 'Escalators & Elevators'],
        priceStartingFrom: 'PKR 80 Lac',
        featured: true,
        createdAt: now,
      },
      {
        _id: uid(),
        title: 'Marjan Heights',
        slug: 'marjan-heights',
        category: 'Mixed Use',
        status: 'Upcoming',
        location: 'Sector 16-A, Shah Latif Town, Karachi',
        shortDescription: 'The next phase — mixed-use towers combining retail, offices, and residences.',
        description:
          'Marjan Heights is the upcoming third phase of the development, bringing office space, boutique retail, and premium residences together on one address.',
        coverImage: IMG.site,
        gallery: [IMG.tower],
        startDate: 'Q1 2027',
        completionDate: 'TBD',
        totalUnits: 250,
        floors: 18,
        amenities: ['Rooftop Terrace', 'Co-working Lounge', 'Smart Home Ready'],
        priceStartingFrom: 'PKR 1.5 Crore',
        featured: false,
        createdAt: now,
      },
    ]);
  }

  if (!localStorage.getItem('db_blogs')) {
    const now = new Date().toISOString();
    write('db_blogs', [
      {
        _id: uid(),
        title: 'Construction Update: Residency Tower Reaches 15th Floor',
        slug: 'construction-update-15th-floor',
        coverImage: IMG.site,
        excerpt: 'Structural work on Marjan Classic Residency has now crossed the halfway mark.',
        content:
          'Structural work on Marjan Classic Residency has now crossed the halfway mark, with the main tower reaching its 15th floor ahead of schedule. Finishing work on the podium and amenity floors is expected to begin next quarter.',
        author: 'Marjan Classic Team',
        published: true,
        createdAt: now,
      },
      {
        _id: uid(),
        title: '5 Things to Check Before Booking a Mall Retail Unit',
        slug: '5-things-before-booking-retail-unit',
        coverImage: IMG.mall,
        excerpt: 'A quick guide for investors considering a shop at Marjan Classic Mall.',
        content:
          'From footfall projections to floor placement, here are five things every investor should evaluate before booking a retail unit — location within the mall, anchor tenant mix, service charges, parking allocation, and handover timelines.',
        author: 'Marjan Classic Team',
        published: true,
        createdAt: now,
      },
    ]);
  }

  if (!localStorage.getItem('db_gallery')) {
    write(
      'db_gallery',
      [IMG.tower, IMG.mall, IMG.interior, IMG.lobby, IMG.night, IMG.site].map((image, i) => ({
        _id: uid(),
        title: ['Tower Exterior', 'Mall Facade', 'Interior Finish', 'Lobby', 'Night View', 'Site Progress'][i],
        image,
        category: i < 3 ? 'Renders' : 'Site Photos',
        createdAt: new Date().toISOString(),
      }))
    );
  }

  if (!localStorage.getItem('db_careers')) {
    write('db_careers', [
      {
        _id: uid(),
        title: 'Site Engineer',
        department: 'Construction',
        location: 'Karachi',
        type: 'Full-time',
        description: 'Oversee daily construction activity and quality control at the Marjan Classic site.',
        requirements: ["Bachelor's in Civil Engineering", '3+ years site experience', 'PEC registered'],
        isOpen: true,
        createdAt: new Date().toISOString(),
      },
      {
        _id: uid(),
        title: 'Sales Executive',
        department: 'Sales',
        location: 'Karachi',
        type: 'Full-time',
        description: 'Manage walk-in clients and site visits for both residential and commercial units.',
        requirements: ['1+ years real estate sales', 'Strong communication skills'],
        isOpen: true,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  if (!localStorage.getItem('db_banners')) {
    const now = new Date().toISOString();
    write('db_banners', [
      {
        _id: uid(),
        eyebrow: 'Sector 16-A · Shah Latif Town · Karachi',
        title: 'Invest Today, Live Luxuriously with',
        highlight: 'Marjan Classic',
        text: 'Step into a world where smart investment meets elevated living — crafted for long-term value and a lifestyle you truly deserve.',
        image: IMG.tower,
        order: 1,
        active: true,
        createdAt: now,
      },
      {
        _id: uid(),
        eyebrow: 'Mall & Residency',
        title: 'Find the Home You\u2019ve',
        highlight: 'Always Dreamed Of',
        text: 'Spaces designed for modern families, offering peace, convenience, and lasting satisfaction in the heart of Karachi.',
        image: IMG.lobby,
        order: 2,
        active: true,
        createdAt: now,
      },
      {
        _id: uid(),
        eyebrow: 'Retail · Residences · Community',
        title: 'A Landmark Address in',
        highlight: 'the Heart of Karachi',
        text: 'Where retail energy and residential calm share one address — thoughtfully planned to match the way you want to live.',
        image: IMG.mall,
        order: 3,
        active: true,
        createdAt: now,
      },
      {
        _id: uid(),
        eyebrow: 'Book Your Visit Today',
        title: 'Step Into Your Perfect',
        highlight: 'Space With Us',
        text: 'Whether you\u2019re upgrading your lifestyle or securing your first investment, our projects deliver comfort, style, and lasting value.',
        image: IMG.night,
        order: 4,
        active: true,
        createdAt: now,
      },
    ]);
  }

  if (!localStorage.getItem('db_offer')) {
    write('db_offer', {
      text: '🎉 Limited-Time Offer — Book now with a flexible 3-year payment plan!',
      link: '/contact',
      enabled: true,
    });
  }
};

seedIfEmpty();

// --- Body parsing (handles both plain objects and FormData w/ files) ------

const parseBody = async (data) => {
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const obj = {};
    const galleryFiles = [];
    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        if (key === 'gallery') galleryFiles.push(await fileToDataUrl(value));
        else obj[key] = await fileToDataUrl(value);
      } else {
        obj[key] = value;
      }
    }
    if (galleryFiles.length) obj.__newGalleryFiles = galleryFiles;
    return obj;
  }
  return data || {};
};

const ok = (data, status = 200) =>
  new Promise((resolve) => setTimeout(() => resolve({ data, status }), DELAY));

const fail = (message, status = 400) =>
  new Promise((_, reject) =>
    setTimeout(() => reject({ response: { data: { message }, status } }), DELAY)
  );

const uniqueSlug = (list, base, ignoreId = null) => {
  let slug = slugify(base);
  let s = slug;
  let n = 1;
  while (list.some((x) => x.slug === s && x._id !== ignoreId)) s = `${slug}-${n++}`;
  return s;
};

// --- Route handlers ---------------------------------------------------------

const handlers = {
  async 'POST /auth/login'(body) {
    const admin = read('db_admin', DEFAULT_ADMIN);
    if (body.email === admin.email && body.password === admin.password) {
      return ok({ _id: 'admin-local', name: admin.name, email: admin.email, token: 'local-demo-token' });
    }
    return fail('Invalid email or password', 401);
  },

  async 'GET /projects'(_, params) {
    let list = read('db_projects', []);
    if (params?.category) list = list.filter((p) => p.category === params.category);
    if (params?.status) list = list.filter((p) => p.status === params.status);
    if (params?.featured !== undefined) list = list.filter((p) => p.featured === (params.featured === 'true' || params.featured === true));
    return ok([...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  },

  async 'GET /blogs'(_, params) {
    let list = read('db_blogs', []);
    if (params?.published !== undefined) list = list.filter((b) => b.published === (params.published === 'true' || params.published === true));
    return ok([...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  },

  async 'GET /gallery'(_, params) {
    let list = read('db_gallery', []);
    if (params?.category) list = list.filter((g) => g.category === params.category);
    return ok([...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  },

  async 'GET /careers'(_, params) {
    let list = read('db_careers', []);
    if (params?.isOpen !== undefined) list = list.filter((c) => c.isOpen === (params.isOpen === 'true' || params.isOpen === true));
    return ok([...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  },

  async 'GET /banners'(_, params) {
    let list = read('db_banners', []);
    if (params?.active !== undefined) list = list.filter((b) => b.active === (params.active === 'true' || params.active === true));
    return ok([...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  },

  async 'GET /offer'() {
    return ok(read('db_offer', { text: '', link: '', enabled: false }));
  },

  async 'PUT /offer'(body) {
    const current = { text: body.text || '', link: body.link || '', enabled: body.enabled !== 'false' && body.enabled !== false };
    write('db_offer', current);
    return ok(current);
  },

  async 'POST /projects'(body) {
    const list = read('db_projects', []);
    if (!body.coverImage) return fail('Cover image is required');
    const item = {
      _id: uid(),
      title: body.title,
      slug: uniqueSlug(list, body.title),
      category: body.category,
      status: body.status,
      location: body.location,
      shortDescription: body.shortDescription,
      description: body.description,
      coverImage: body.coverImage,
      gallery: body.__newGalleryFiles || [],
      startDate: body.startDate,
      completionDate: body.completionDate,
      totalUnits: body.totalUnits ? Number(body.totalUnits) : undefined,
      floors: body.floors ? Number(body.floors) : undefined,
      amenities: body.amenities ? JSON.parse(body.amenities) : [],
      priceStartingFrom: body.priceStartingFrom,
      featured: body.featured === 'true' || body.featured === true,
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    write('db_projects', list);
    return ok(item, 201);
  },

  async 'POST /blogs'(body) {
    const list = read('db_blogs', []);
    if (!body.coverImage) return fail('Cover image is required');
    const item = {
      _id: uid(),
      title: body.title,
      slug: uniqueSlug(list, body.title),
      coverImage: body.coverImage,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author || 'Marjan Classic Team',
      published: body.published !== 'false' && body.published !== false,
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    write('db_blogs', list);
    return ok(item, 201);
  },

  async 'POST /gallery'(body) {
    const list = read('db_gallery', []);
    if (!body.image) return fail('Image is required');
    const item = {
      _id: uid(),
      title: body.title,
      category: body.category || 'General',
      image: body.image,
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    write('db_gallery', list);
    return ok(item, 201);
  },

  async 'POST /careers'(body) {
    const list = read('db_careers', []);
    const item = {
      _id: uid(),
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      description: body.description,
      requirements: body.requirements ? JSON.parse(body.requirements) : [],
      isOpen: body.isOpen !== 'false' && body.isOpen !== false,
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    write('db_careers', list);
    return ok(item, 201);
  },

  async 'POST /banners'(body) {
    const list = read('db_banners', []);
    if (!body.image) return fail('Banner image is required');
    const item = {
      _id: uid(),
      eyebrow: body.eyebrow || '',
      title: body.title,
      highlight: body.highlight || '',
      text: body.text || '',
      image: body.image,
      order: body.order ? Number(body.order) : list.length + 1,
      active: body.active !== 'false' && body.active !== false,
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    write('db_banners', list);
    return ok(item, 201);
  },
};

// GET single-item + PUT + DELETE handled generically per collection below
const collections = {
  projects: 'db_projects',
  blogs: 'db_blogs',
  gallery: 'db_gallery',
  careers: 'db_careers',
  banners: 'db_banners',
};

const getSingle = (coll, idOrSlug) => {
  const list = read(collections[coll], []);
  return list.find((x) => x.slug === idOrSlug) || list.find((x) => x._id === idOrSlug);
};

const updateItem = async (coll, id, body) => {
  const list = read(collections[coll], []);
  const idx = list.findIndex((x) => x._id === id);
  if (idx === -1) return fail(`${coll.slice(0, -1)} not found`, 404);
  const current = list[idx];

  if (coll === 'projects' && body.title && body.title !== current.title) {
    current.slug = uniqueSlug(list, body.title, id);
  }
  if (coll === 'blogs' && body.title && body.title !== current.title) {
    current.slug = uniqueSlug(list, body.title, id);
  }

  Object.entries(body).forEach(([k, v]) => {
    if (k === '__newGalleryFiles' || k === 'removeGalleryImages' || k === 'amenities' || k === 'requirements') return;
    if (v !== undefined && v !== '') current[k] = v;
  });

  if (coll === 'projects') {
    if (body.__newGalleryFiles?.length) current.gallery = [...(current.gallery || []), ...body.__newGalleryFiles];
    if (body.removeGalleryImages) {
      const toRemove = JSON.parse(body.removeGalleryImages);
      current.gallery = (current.gallery || []).filter((g) => !toRemove.includes(g));
    }
    if (body.amenities) current.amenities = JSON.parse(body.amenities);
    if (body.featured !== undefined) current.featured = body.featured === 'true' || body.featured === true;
    if (body.totalUnits) current.totalUnits = Number(body.totalUnits);
    if (body.floors) current.floors = Number(body.floors);
  }
  if (coll === 'blogs' && body.published !== undefined) {
    current.published = body.published !== 'false' && body.published !== false;
  }
  if (coll === 'careers') {
    if (body.requirements) current.requirements = JSON.parse(body.requirements);
    if (body.isOpen !== undefined) current.isOpen = body.isOpen !== 'false' && body.isOpen !== false;
  }
  if (coll === 'banners') {
    if (body.active !== undefined) current.active = body.active !== 'false' && body.active !== false;
    if (body.order) current.order = Number(body.order);
  }

  list[idx] = current;
  write(collections[coll], list);
  return ok(current);
};

const deleteItem = async (coll, id) => {
  const list = read(collections[coll], []);
  const next = list.filter((x) => x._id !== id);
  write(collections[coll], next);
  return ok({ message: 'Deleted' });
};

// --- Public API matching the axios interface --------------------------------

const parsePath = (url) => url.replace(/^\/+/, '').split('/');

const api = {
  async get(url, config = {}) {
    const params = config.params;
    const clean = url.split('?')[0];

    if (clean === '/auth/me') {
      const info = read('adminInfo', null);
      return ok(info);
    }

    const key = `GET ${clean}`;
    if (handlers[key]) return handlers[key](null, params);

    // GET /:collection/:idOrSlug
    const parts = parsePath(clean);
    if (parts.length === 2 && collections[parts[0]]) {
      const item = getSingle(parts[0], parts[1]);
      if (!item) return fail('Not found', 404);
      return ok(item);
    }

    return fail('Route not found', 404);
  },

  async post(url, data) {
    const clean = url.split('?')[0];
    const body = await parseBody(data);
    const key = `POST ${clean}`;
    if (handlers[key]) return handlers[key](body);
    return fail('Route not found', 404);
  },

  async put(url, data) {
    const clean = url.split('?')[0];
    const body = await parseBody(data);

    if (clean === '/offer') return handlers['PUT /offer'](body);

    const parts = parsePath(clean);
    if (parts.length === 2 && collections[parts[0]]) {
      return updateItem(parts[0], parts[1], body);
    }
    return fail('Route not found', 404);
  },

  async delete(url) {
    const clean = url.split('?')[0];
    const parts = parsePath(clean);
    if (parts.length === 2 && collections[parts[0]]) {
      return deleteItem(parts[0], parts[1]);
    }
    return fail('Route not found', 404);
  },
};

export default api;