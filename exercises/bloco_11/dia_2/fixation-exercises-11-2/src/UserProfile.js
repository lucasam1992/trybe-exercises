import React from 'react';


class UserProfile extends React.Component {
    render(){
        const shoppingList = ['leite', 'arroz', 'feijão', 'banana', 'carne'];
        const items = shoppingList.map((elementos) => {
            return (<li>{ elementos }</li>);
        });

        return (
            <div>
                <h2>Lista de compras</h2>
                <ul>
                    { items }
                </ul>
            </div>
        );
    }
}

export default UserProfile;