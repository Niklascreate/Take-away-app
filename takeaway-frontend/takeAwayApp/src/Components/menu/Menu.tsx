import './menu.css';
import { useEffect, useState } from 'react';
import { fetchMenu } from '../../../api/Api';
import { Dish } from '../../../interface/Interface';
import OverlayMenyInfo from '../overlaymenyinfo/OverlayMenyinfo';

const Menu = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Dish | null>(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const [menuData] = await Promise.all([fetchMenu()]);
        setDishes(menuData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
      }
    };

    getMenu();
  }, []);

  const openOverlay = (item: Dish ) => setSelectedItem(item);
  const closeOverlay = () => setSelectedItem(null);

  if (loading) return <p className='menu_loading'>Loading...</p>;
  if (error) return <p className='menu_error'>{error}</p>;

  return (
    <section className="menu_container">
      <h1 className="menu_header">Meny</h1>
  
      <section className="dishes_section">
        {dishes
          .filter((dish) => dish.category === "food") 
          .map((dish) => (
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
        {dishes
          .filter((dish) => dish.category === "drink")
          .map((dish) => (
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
  
      {selectedItem && (
        <OverlayMenyInfo closeOverlay={closeOverlay} dish={selectedItem} />
      )}
    </section>
  );
  
};

export default Menu;
