import { useEffect, useState } from "react";
import { useActivityStore } from "@/store/activityStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const ActivityCard = () => {
    const { activity, activities, fetchRandom, fetchByFilters, setFilters, isLoading, error } = useActivityStore();
    const [typeFilter, setTypeFilter] = useState("");

    const activityTypes = [
        "education",
        "recreational",
        "social",
        "charity",
        "cooking",
        "relaxation",
        "busywork",
    ];

    useEffect(() => {
        fetchRandom();
    }, []);

    const handleFilter = () => {
        setFilters({ type: typeFilter });
        fetchByFilters();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Select value={typeFilter} onValueChange={setTypeFilter} >
                    <SelectTrigger className="bg-white text-black">
                        <SelectValue placeholder="Выберите тип активности" />
                    </SelectTrigger>
                    <SelectContent>
                        {activityTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleFilter}>Применить фильтр</Button>
                <Button onClick={fetchRandom}>
                    Случайная активность
                </Button>
            </div>

            {isLoading && <p className="text-gray-500">Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {activity && (
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">{activity.activity}</CardTitle>
                        <CardDescription className="text-gray-500">Тип: {activity.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p>Участники: {activity.participants}</p>
                        <p>Цена: {activity.price}</p>
                        {activity.link && (
                            <p>
                                Ссылка:{" "}
                                <a href={activity.link} target="_blank" className="text-blue-600 underline">
                                    Перейти
                                </a>
                            </p>
                        )}
                    </CardContent>
                </Card>
            )}

            {activities.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activities.map((a) => (
                        <Card key={a.key} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-md font-semibold">{a.activity}</CardTitle>
                                <CardDescription className="text-gray-500">Тип: {a.type}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1">
                                <p>Участники: {a.participants}</p>
                                <p>Цена: {a.price}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
