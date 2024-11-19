import './menu.css'
import { useEffect, useState } from 'react';
import { fetchMenu } from '../../../api/api';
import { Dish } from '../../../interface/interface';

const Menu = () => {
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const data = await fetchMenu();
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu. Please try again later.");
        setLoading(false);
      }
    };

    getMenu();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="menu_container">
      <h1 className="menu_header">meny</h1>
      {menuItems.map((dish) => (
        <section key={dish.id} className="menu">
          <img src={dish.imageUrl} alt={dish.name} className="menu_img" />
          <section className="menu_descText">
            <h2 className="menu_dish">{dish.name}</h2>
            <p className="menu_desc">{dish.description}</p>
            <p className="menu_price">{dish.price} sek</p>
          </section>
        </section>
      ))}
    </section>
  );
};

export default Menu;



