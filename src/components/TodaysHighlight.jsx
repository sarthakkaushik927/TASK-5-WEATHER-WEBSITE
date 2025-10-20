import React from 'react';
import { HighlightCard } from './ui/HighlightCard.jsx';

const TodaysHighlights = ({ data }) => {
    const { current, forecast } = data;
    return (
        <div>
            <h2 className="text-xl text-white mb-4">Today's Highlight</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HighlightCard title="UV Index">
                    <div className="w-24 h-24 mx-auto my-2 rounded-full border-[10px] border-yellow-400 flex items-center justify-center">
                        <span className="text-3xl font-bold">{current.uv}</span>
                    </div>
                </HighlightCard>
                <HighlightCard title="Chance of Rain" value={forecast.forecastday[0].day.daily_chance_of_rain} unit="%" />
                <HighlightCard title="Wind Status" value={current.wind_kph} unit="km/h" />
                <HighlightCard title="Humidity" value={current.humidity} unit="%" />
            </div>
        </div>
    );
};

export default TodaysHighlights;

