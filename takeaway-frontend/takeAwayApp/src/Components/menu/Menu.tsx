import './menu.css';
import { useEffect, useState } from 'react';
import { fetchMenu, fetchDrinks } from '../../../api/Api';
import { Dish, Drinks } from '../../../interface/Interface';
import OverlayMenyInfo from '../overlaymenyinfo/OverlayMenyinfo';

const Menu = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [drinks, setDrinks] = useState<Drinks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Dish | Drinks | null>(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const [menuData, drinksData] = await Promise.all([fetchMenu(), fetchDrinks()]);
        setDishes(menuData);
        setDrinks(drinksData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
      }
    };

    getMenu();
  }, []);

  const openOverlay = (item: Dish | Drinks) => setSelectedItem(item);
  const closeOverlay = () => setSelectedItem(null);

  if (loading) return <p className='menu_loading'>Loading...</p>;
  if (error) return <p className='menu_error'>{error}</p>;

  return (
    <section className="menu_container">
      <h1 className="menu_header">Meny</h1>
      
      <section className="dishes_section">
        {dishes.map((dish) => (
          <section key={dish.id} className="menu" onClick={() => openOverlay(dish)}>
            <img src={dish.imageUrl} alt={dish.name} className="menu_img" />
            <section className="menu_descText">
              <h2 className="menu_dish">{dish.name}</h2>
              <p className="menu_desc">{dish.description}</p>
              <p className="menu_price">{dish.price} sek</p>
            </section>
          </section>
        ))}
      </section>

      <section className="drinks_section">
        <h2 className="menu_header">Drycker</h2>
        {drinks.map((drink) => (
          <section key={drink.id} className="menu" onClick={() => openOverlay(drink)}>
            <img src={drink.imageUrl} alt={drink.name} className="menu_img" />
            <section className="menu_descText">
              <h2 className="menu_dish">{drink.name}</h2>
              <p className="menu_desc">{drink.description}</p>
              <p className="menu_price">{drink.price} sek</p>
            </section>
          </section>
        ))}
      </section>

      {selectedItem && (
  <OverlayMenyInfo closeOverlay={closeOverlay} dish={selectedItem} />
)}
    </section>
  );
};

export default Menu;
