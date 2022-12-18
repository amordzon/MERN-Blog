import React from 'react';

const PopularPosts = () => {
    return (
        <div className="mt-12 mx-4 ">
            <h3 className="font-bold text-gray-900">NAJPOPULARNIEJSZE WPISY</h3>
            <div className="mt-2">
                <ul>
                    <li className="list-disc">
                        <a href="" className="hover:underline">
                            Szerokie spodnie czy rurki?
                        </a>
                    </li>

                    <li className="list-disc">
                        <a href="" className="hover:underline">
                            Najbezpieczniejsze kraje świata
                        </a>
                    </li>

                    <li className="list-disc">
                        <a href="" className="hover:underline">
                            Oto najbardziej znienawidzony znak zodiaku!
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PopularPosts;
