import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar, ScrollView, ImageBackground, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
// import Carousel from 'react-native-anchor-carousel';
import Carousel from 'react-native-anchor-carousel';

import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons'


const Home = () => {

  const [background, setBackground] = useState()
  const [gallery, setgallery] = useState([]);



  const [list, setList] = useState();

  const carouselRef = useRef(null);

  const { width, height } = Dimensions.get('window')

  const routeRecents = () => {
    props.navigation.navigate('Recents')
  }
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
          setBackground({
            uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            name: item.title,
            stat: item.release_date,
            desc: item.overview
          })
        }
        }
      >
        <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }} style={styles.carouselImage} />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const urlTrendingMovies = 'https://api.themoviedb.org/3/trending/movie/week?language=en-US';
      const urlPopularMovies = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTU2MGYyYjBiZDk1M2JmZjYyM2ExMDA4M2VlZjY0OSIsInN1YiI6IjY2NGM1YmIxNTIzMDg0NjRhMjE5ODlhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M0EqzXnfFzqdLXfRMOd646pc8fFjJBp-ijJabzrqgjE"

      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      };

      try {
        const [responseTrendingMovies, responsePopularMovies] = await Promise.all([
          fetch(urlTrendingMovies, options),
          fetch(urlPopularMovies, options)
        ]);

        if (!responseTrendingMovies.ok || !responsePopularMovies.ok) {
          throw new Error('Network response was not ok');
        }

        const dataTrendingMovies = await responseTrendingMovies.json();
        const dataPopularMovies = await responsePopularMovies.json();

        console.log('Data from trending movies:', dataTrendingMovies);
        console.log('Data from popular movies:', dataPopularMovies);

        setgallery(dataTrendingMovies.results);
        setList(dataPopularMovies.results);
        setBackground({
          uri: `https://image.tmdb.org/t/p/original/${dataTrendingMovies.results[0].poster_path}`,
          name: dataTrendingMovies.results[0].title,
          stat: dataTrendingMovies.results[0].release_date,
          desc: dataTrendingMovies.results[0].overview
        });
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovies();
  }, []);


  return (
    <ScrollView style={{ backgroundColor: '#000' }} blurRadius={100}>

      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <View style={styles.carouselContentContainer}>
        <View style={{  backgroundColor: '#000'}}>
          <ImageBackground source={{ uri: background?.uri }} style={styles.ImageBg} blurRadius={40}>
            <View style={styles.SearchboxContainer}>
              <TextInput
                placeholder='Search Movies'
                placeholderTextColor='#666'
                style={styles.Searchbox}
              >
              </TextInput>
              <Feather name='search' size={22} color='#666' style={styles.SearchboxIcon} />
            </View>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10, marginVertical: 10 }}>Top Picks this Week</Text>
            <View style={styles.carouselContainerView}>
              {/* <Carousel 
                style={styles.carousel}
                data={gallery}
                renderItem={renderItem}
                itemWidth={200}
                containerWidth={width - 20}
                separatorWidth={0}
                ref={carouselRef}
                inActiveOpacity={0.4}
              //pagingEnable={false}
              //minScrollDistance={20}
              /> */}
              <Carousel
                ref={carouselRef}
                data={gallery}
                renderItem={renderItem}
                style={styles.carousel}
                itemWidth={200}
                containerWidth={width - 20}
                separatorWidth={0}
                inActiveOpacity={0.4}
                onScrollEnd={() => console.log('hit scroll')}
              />
            </View>


            <View style={styles.movieInfoContainer}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.movieName}>{background?.name}</Text>
                <Text style={styles.movieStat}>{background?.stat}</Text>
              </View>
              <TouchableOpacity style={styles.playIconContainer}>
                <FontAwesome5 name='play' size={20} color='#02ad94' style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 14, marginTop: 14 }}>
              <Text style={{ color: 'white', opacity: 0.8, lineHeight: 20, }}>
                {background?.desc}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={{ marginHorizontal: 14, marginTop: '3rem'  }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Continue Watching</Text>
        <ImageBackground
          style={{ height: 250, width: '100%', backgroundColor: '000' }}
          resizeMode='cover'
          source={{
            uri: 'https://www.thehindu.com/entertainment/movies/4xicg2/article26618002.ece/ALTERNATES/LANDSCAPE_1200/how-to-train-your-dragon'
          }}
        >

          <Text style={{ color: 'white', padding: 14 }}>How to Train Your Dragon: The Hidden World</Text>

          <TouchableOpacity style={{ ...styles.playIconContainer, position: 'absolute', top: '40%', right: '40%' }}>
            <FontAwesome5 name='play' size={20} color='#02ad94' style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          {/* <View style={{height: 4, backgroundColor: '#666', position: 'absolute', bottom: 0, width: '100%'}}></View>
        <View style={{height: 4, borderRadius: 10, backgroundColor: '#02ad94', position: 'absolute', bottom: 0, width: '40%'}}></View> */}
        </ImageBackground>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 36 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', }}>My List</Text>
          <Text style={{ color: '#02ad94', fontSize: 14, fontWeight: 'normal' }}>View All</Text>
        </View>

        <FlatList
          style={{ marginBottom: 30 }}
          horizontal={true}
          data={list}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item.poster_path}` }} style={{ height: 300, width: 200 }} />
                <View style={{ position: "absolute", height: 5, width: '100%', backgroundColor: '#02ad94', opacity: 0.8 }}></View>
                <FontAwesome5 name='play' size={38} color='#fff' style={{ position: 'absolute', top: '45%', left: '45%', opacity: 0.9 }} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  carouselImage: {
    width: 200,
    height: 320,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  carouselText: {
    paddingLeft: 14,
    color: 'white',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold'
  },
  carouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  carouselContentContainer: {
    backgroundColor: '#000',
    height: 720,
    paddingHorizontal: 14
  },
  SearchboxContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
  },
  Searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  SearchboxIcon: {
    position: 'absolute',
    right: 20,
    top: 14
  },
  ImageBg: {
    // flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start',
  },
  carouselContainerView: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  movieInfoContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 14
  },
  movieName: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    width: "228px",
    fontSize: 20,
    marginBottom: 6
  },
  movieStat: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    opacity: 0.8
  },
  playIconContainer: {
    backgroundColor: '#212121',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderWidth: 4,
    borderColor: 'rgba(2, 173, 148, 0.2)',
    marginBottom: 14
  }
});

export default Home;