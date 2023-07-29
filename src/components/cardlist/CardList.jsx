import { useSelector } from "react-redux";
import { Card } from "../card/Card";
import './style.scss';


export const CardList = () => {

    const { posts } = useSelector(s => s.cards)
    return (
        <div className="cards">
            {
                posts.map((item) => {
                    return <Card
                        item={item}
                        key={item.id}
                    />;
                })
            }
        </div>
    )
}