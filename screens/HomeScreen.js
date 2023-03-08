import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
// import { sanityClient } from '../sanity';
// import { SanityClient } from 'sanity';
import sanityClient from '../sanity';
import 'url-search-params-polyfill';


const HomeScreen = () => {
    
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    // as soon as the screen mounts, do -
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[] -> {
              ...,
              dishes[] ->
            }
          }
        `).then(data => {
            setFeaturedCategories(data)
        });
    }, []);

    console.log(featuredCategories);

    return (
        <SafeAreaView className="bg-white pt-5">
            {/* Header */}
            <View className="flex-row pb-5 items-center mx-4 space-x-2 pt-2">
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru",
                    }}
                    className="h-7 w-7 bg-gray-300 p-5 rounded-full"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver now!</Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <Entypo name="chevron-small-down" size={24} color="#00CCBB" />
                    </Text>
                </View>

                <FontAwesome name="user-o" size={24} color="#00CCBB" />

            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2.5 rounded-md">
                    <AntDesign name="search1" size={24} color="gray" />
                    <TextInput
                        placeholder='Restaurants and cuisines'
                        keyboardType='default'
                    />
                </View>

                <SimpleLineIcons name="equalizer" size={24} color="#00CCBB" />

            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100"
            contentContainerStyle={{
                paddingBottom: 100,
            }}
            >
                {/* Categories */}
                <Categories/>

                {/* Featured rows */}

                {featuredCategories?.map((category) => (
                    <FeaturedRow
                    key={category._id}
                    id={category._id}
                    title={category.name}
                    description={category.short_description}
                />
                ))}

                {/* <FeaturedRow
                    id="123"
                    title="Featured"
                    description="Paid placements from our partners"
                    featuredCategory="featured"
                
                />
                <FeaturedRow
                    id="1234"
                    title="Tasty Discounts"
                    description="Everyone's been enoying these juicy discounts!"
                    featuredCategory="discounts"
                
                />
                <FeaturedRow
                    id="1235"
                    title="Offers near you!"
                    description="Why not support your local restaurant tonight?"
                    featuredCategory="offers"
                
                /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen