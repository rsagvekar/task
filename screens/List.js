import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getBooks, addBookmark, removeBookmark } from '../redux/action';
import moment from 'moment';
import { SliderBox } from "react-native-image-slider-box";

export default function List() {
    const { books, bookmarks } = useSelector(state => state.booksReducer);
    const dispatch = useDispatch();

    const addToBookmarkList = book => dispatch(addBookmark(book));
    const removeFromBookmarkList = book => dispatch(removeBookmark(book));

    const handleAddBookmark = book => {
        addToBookmarkList(book);
    };

    const handleRemoveBookmark = book => {
        removeFromBookmarkList(book);
    };

    const fetchBooks = () => dispatch(getBooks());

    const ifExists = book => {
        if (bookmarks.filter(item => item.id === book.id).length > 0) {
            return true;
        }

        return false;
    };

    const [images, setImages] = useState(['https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg', 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg']);

    useEffect(() => {
        fetchBooks();
    }, []);

    //console.warn("Books: ", books)

    const renderItem = ({ item }) => {
        var date = new Date(); //Current Date
        var momentObj = moment(item.endDate, 'DD-MM-YYYY');
        var diff = momentObj.diff(date, 'days');
        return (
            <View>
                <View>
                    <SliderBox
                        images={images}
                        sliderBoxHeight={300}
                    />
                    {/* <Image
                        style={{ height: 300, width: '100%' }}
                        resizeMode={a'cover'}
                        //style={styles.tinyLogo}
                        source={{
                            uri: 'https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg',
                        }}
                    /> */}
                </View>
                <View style={{ height: 150, width: '100%', backgroundColor: '#2395da', flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 80, marginLeft: 10, fontSize: 25, color: 'white', fontWeight: 'bold' }}>₹</Text>
                            <Text style={{ marginTop: 85, marginLeft: 5, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.collectedValue}</Text>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: 'white', fontWeight: '400' }}>FUNDED</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 80, marginLeft: 10, fontSize: 25, color: 'white', fontWeight: 'bold' }}>₹</Text>
                            <Text style={{ marginTop: 85, marginLeft: 5, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.totalValue}</Text>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 15, color: 'white', fontWeight: '400' }}>GOALS</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 85, marginLeft: 15, color: 'white', fontSize: 17, fontWeight: 'bold' }}>{diff}</Text>
                        </View>
                        <View>
                            <Text style={{ marginTop: 5, marginLeft: 15, fontSize: 15, color: 'white', fontWeight: '400' }}>ENDS IN</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'column', marginLeft: 25, marginTop: -10 }}>
                        <TouchableOpacity style={{
                            marginTop: 100, backgroundColor: 'white', width: '100%',
                            height: 30,
                            width: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#24a8f5' }}>PLEDGE</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', opacity: 5, height: 100, width: 370, backgroundColor: 'rgba(52, 52, 52, 0)', position: 'absolute', left: 10, top: 250, borderRadius: 20 }}>

                    <View style={{ height: 120, width: 280, backgroundColor: 'white', borderRadius: 20, padding: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 230, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.title}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() =>
                                    ifExists(item) ? handleRemoveBookmark(item) : handleAddBookmark(item)
                                }
                            >
                                <View style={{}}>
                                    <MaterialCommunityIcons
                                        name={ifExists(item) ? 'heart-outline' : 'heart'}
                                        //name="heart-outline"
                                        color={ifExists(item) ? 'black' : 'red'}
                                        //color="black"
                                        size={20}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 25, fontSize: 14, }}>{item.shortDescription}</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 80, width: 80, backgroundColor: '#063754', borderRadius: 80, margin: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>100 %</Text>
                    </View>

                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1B26' }}>
            <View style={{ flex: 1, }}>
                <View style={{ height: 200, width: '100%', backgroundColor: 'black', }}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginTop: 150, marginLeft: 20 }}>Records List</Text>
                </View>
                <View style={{ flex: 1, marginTop: 8 }}>
                    <FlatList
                        data={books}
                        keyExtractor={({ id }, index) => id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});