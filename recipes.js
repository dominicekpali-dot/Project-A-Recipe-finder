const recipes = [
  {name:'Mediterranean Chickpea Salad',description:'A bright, crunchy salad with chickpeas, cucumber, juicy tomatoes and lemon.',servings:2,prep:10,cook:0,image:'photo-1512621776951-a57141f2eefd',ingredients:['1 can chickpeas, drained','1 cup cherry tomatoes, halved','1 cucumber, diced','¼ red onion, thinly sliced','2 tbsp olive oil','Juice of ½ lemon','Parsley, salt and pepper'],steps:['Add chickpeas, tomatoes, cucumber and onion to a bowl.','Dress with olive oil, lemon juice, parsley, salt and pepper. Toss and serve.']},
  {name:'Avocado & Tomato Wholegrain Toast',description:'Creamy avocado and sweet tomatoes on crisp wholegrain toast.',servings:1,prep:5,cook:5,image:'photo-1525351484163-7529414344d8',ingredients:['2 slices wholegrain bread','1 ripe avocado','1 small tomato, chopped','1 tsp lemon juice','Chilli flakes, salt and pepper'],steps:['Toast the bread until golden.','Mash avocado with lemon, salt and pepper. Spoon over toast and top with tomato and chilli flakes.']},
  {name:'One-Pan Lemon Garlic Salmon with Asparagus',description:'Tender salmon and green asparagus with bright lemon and garlic.',servings:2,prep:5,cook:12,image:'photo-1467003909585-2f8a72700288',ingredients:['2 salmon fillets','1 bunch asparagus, trimmed','1 lemon, sliced','2 garlic cloves, minced','1 tbsp olive oil','Salt and black pepper'],steps:['Warm oil in a pan over medium heat. Add garlic and salmon, skin side down.','Add asparagus and lemon. Cook 5–6 minutes per side, until salmon flakes easily and asparagus is tender.']},
  {name:'Quinoa Veggie Power Bowl',description:'A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.',servings:2,prep:10,cook:15,image:'photo-1511690743698-d9d85f2fbf38',ingredients:['1 cup cooked quinoa','1 sweet potato, cubed','1 avocado, sliced','1 cup baby spinach','½ cup chickpeas','1 tbsp olive oil','Lemon wedge'],steps:['Roast sweet potato with olive oil at 220°C / 425°F for 15 minutes.','Divide quinoa, spinach, chickpeas, sweet potato and avocado between bowls. Finish with lemon.']},
  {name:'Sweet Potato Black Bean Tacos',description:'Smoky roasted sweet potatoes and black beans tucked into warm tortillas.',servings:3,prep:10,cook:15,image:'photo-1551504734-5ee1c4a1479b',ingredients:['1 large sweet potato, cubed','1 can black beans, rinsed','6 small corn tortillas','1 tsp smoked paprika','½ cup salsa','Fresh cilantro and lime'],steps:['Roast sweet potato with paprika at 220°C / 425°F for 15 minutes.','Warm beans and tortillas. Fill each tortilla with sweet potato, beans, salsa, cilantro and lime.']},
  {name:'Greek Yogurt Berry Parfait',description:'Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.',servings:1,prep:5,cook:0,image:'photo-1488477181946-6428a0291777',ingredients:['1 cup plain Greek yogurt','½ cup mixed berries','¼ cup rolled oats or granola','1 tsp honey'],steps:['Spoon half the yogurt into a glass. Add half the berries and oats.','Repeat the layers and finish with a drizzle of honey.']},
  {name:'Hearty Tomato & White Bean Soup',description:'A comforting tomato soup with creamy beans, herbs and crusty bread.',servings:2,prep:10,cook:20,image:'photo-1547592180-85f173990554',ingredients:['1 can white beans, drained','1 can chopped tomatoes','1 small onion, diced','2 cups vegetable stock','1 tsp dried oregano','2 slices wholegrain bread'],steps:['Soften onion in a pot, then stir in tomatoes, stock and oregano. Simmer for 10 minutes.','Add beans and simmer 5 more minutes. Serve with warm bread.']},
  {name:'Banana Berry Overnight Oats',description:'A make-ahead breakfast packed with oats, banana and fresh berries.',servings:1,prep:5,cook:0,image:'photo-1490645935967-10de6ba17061',ingredients:['½ cup rolled oats','½ cup milk of choice','½ banana, sliced','½ cup mixed berries','1 tbsp chia seeds'],steps:['Stir oats, milk and chia seeds together in a jar. Refrigerate overnight.','In the morning, top with banana and berries.']}
];

const grid = document.querySelector('#recipe-list');
const searchInput = document.querySelector('#recipe-search');
const prepFilter = document.querySelector('#prep-filter');
const cookFilter = document.querySelector('#cook-filter');
const noResults = document.querySelector('.no-results');
const dialog = document.querySelector('.recipe-dialog');
const dialogContent = document.querySelector('.dialog-content');

function recipeImage(recipe, width = 700) {
  return `https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=${width}&q=85`;
}

function renderRecipes() {
  const query = searchInput.value.trim().toLowerCase();
  const maxPrep = prepFilter.value === 'all' ? Infinity : Number(prepFilter.value);
  const maxCook = cookFilter.value === 'all' ? Infinity : Number(cookFilter.value);
  const filtered = recipes.filter(recipe => `${recipe.name} ${recipe.description} ${recipe.ingredients.join(' ')}`.toLowerCase().includes(query) && recipe.prep <= maxPrep && recipe.cook <= maxCook);
  grid.innerHTML = filtered.map(recipe => `
    <article class="recipe-card">
      <img src="${recipeImage(recipe)}" alt="${recipe.name}" loading="lazy">
      <div class="recipe-card-copy">
        <h2 title="${recipe.name}">${recipe.name}</h2>
        <p>${recipe.description}</p>
        <div class="recipe-meta"><span>♟ Servings: ${recipe.servings}</span><span>◴ Prep: ${recipe.prep} mins</span><span>♨ Cook: ${recipe.cook} mins</span></div>
        <button class="button view-recipe" type="button" data-recipe="${recipes.indexOf(recipe)}">View Recipe</button>
      </div>
    </article>`).join('');
  noResults.hidden = filtered.length !== 0;
}

grid.addEventListener('click', event => {
  const button = event.target.closest('.view-recipe');
  if (!button) return;
  const recipe = recipes[Number(button.dataset.recipe)];
  dialogContent.innerHTML = `<img src="${recipeImage(recipe, 1000)}" alt="${recipe.name}"><h2 id="dialog-title">${recipe.name}</h2><p>${recipe.description} Serves ${recipe.servings} · ${recipe.prep} min prep · ${recipe.cook} min cook.</p><h3>Ingredients</h3><ul>${recipe.ingredients.map(item => `<li>${item}</li>`).join('')}</ul><h3>Method</h3><ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>`;
  dialog.showModal();
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
searchInput.addEventListener('input', renderRecipes);
prepFilter.addEventListener('change', renderRecipes);
cookFilter.addEventListener('change', renderRecipes);
renderRecipes();
