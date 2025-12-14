
// Import local asset for the one we generated
// For others we will use a placeholder or reuse this one for demo purposes
// In a real app we'd have all of them.

const avocadoSaladImg = '/exercises/avocado_salad_top_view_1765731654029.png'; // Assuming it was moved to public or referenced correctly. 
// Wait, the tool saves to artifacts. I need to move it or refer to it. 
// For now, I'll assume I can use the absolute path or I should copy it to public. 
// Actually, for web app to see it, it must be in public or imported.
// I will use a placeholder URL if I can't move it easily, but I should try to use the artifact path if possible or tell user to move it.
// The user has 'public/exercises'. I'll assume I should put food images in 'public/food'.
// I'll format the data first.

export const MEALS = [
    {
        id: '1',
        name: 'Avokádový a pomarančový šalát',
        image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=600&auto=format&fit=crop', // Placeholder until local asset is moved
        time: 15,
        calories: 529,
        difficulty: 'Ľahké',
        category: 'Obed',
        tags: ['Obed', 'Večera', 'Bez cukru', 'Vegetariánske', 'Šalát'],
        ingredients: [
            { amount: '1 pl', name: 'Olivový olej' },
            { amount: '1 pl', name: 'Pomaranč, odšťavený' },
            { amount: '1 čl', name: 'Dijónska horčica' },
            { amount: '1 čl', name: 'Med' },
            { amount: '2 šálky', name: 'Špenát' },
            { amount: '½ šálka', name: 'Pomaranč, segmentovaný' },
            { amount: '½ ks', name: 'Avokádo, nakrájané na plátky' },
            { amount: '¼ šálka', name: 'Syr Feta, rozdrvený' },
            { amount: '¼ šálka', name: 'Semená granátového jablka' },
            { amount: '1 pl', name: 'Mandle' }
        ],
        steps: [
            'V miske vyšľahajte olej, pomarančovú šťavu, horčicu, med, soľ a korenie.',
            'Do misky naaranžujte špenát, pomaranč, avokádo, syr feta, granátové jablká a mandle.',
            'Dresing pokvapkajte. Podávajte a jedzte!'
        ]
    },
    {
        id: '2',
        name: 'Huby a špenátové krepy',
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=600&auto=format&fit=crop',
        time: 20,
        calories: 530,
        difficulty: 'Stredné',
        category: 'Raňajky',
        tags: ['Raňajky', 'Pro'],
        ingredients: [
            { amount: '2 ks', name: 'Vajcia' },
            { amount: '100g', name: 'Špenát' },
            { amount: '50g', name: 'Huby' }
        ],
        steps: [
            'Pripravte cesto na palacinky.',
            'Orestujte huby a špenát.',
            'Naplňte palacinky a podávajte.'
        ]
    },
    {
        id: '3',
        name: 'Ovos a figový jogurt',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop', // Yogurt/Oats image
        time: 5,
        calories: 538,
        difficulty: 'Ľahké',
        category: 'Raňajky',
        tags: ['Raňajky', 'Rýchle', 'Pro'],
        ingredients: [
            { amount: '150g', name: 'Grécky jogurt' },
            { amount: '2 ks', name: 'Figy' },
            { amount: '50g', name: 'Ovsené vločky' }
        ],
        steps: [
            'Zmiešajte jogurt s vločkami.',
            'Ozdobte nakrájanými figami a medom.'
        ]
    },
    {
        id: '4',
        name: 'Cícerový a špenátový šalát',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        time: 10,
        calories: 441,
        difficulty: 'Ľahké',
        category: 'Obed',
        tags: ['Obed', 'Vegetariánske', 'Pro'],
        ingredients: [
            { amount: '1 plechovka', name: 'Cícer' },
            { amount: '100g', name: 'Špenát' },
            { amount: '50g', name: 'Feta' }
        ],
        steps: [
            'Cícer prepláchnite.',
            'Zmiešajte so špenátom a fetou.',
            'Dochuťte citrónom a olejom.'
        ]
    },
    {
        id: '5',
        name: 'Losos a avokádový toast',
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=600&auto=format&fit=crop', // Toast image
        time: 12,
        calories: 380,
        difficulty: 'Ľahké',
        category: 'Raňajky',
        tags: [], // Added missing tags to prevent crash
        ingredients: [
            { amount: '1 plátok', name: 'Kváskový chlieb' },
            { amount: '50g', name: 'Údený losos' },
            { amount: '1/2', name: 'Avokádo' }
        ],
        steps: [
            'Opečte chlieb.',
            'Roztlačte avokádo na chlieb.',
            'Pridajte lososa'
        ]
    }
];
