import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  FlatList,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import {getBlogs, deleteBlog} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

class Blogs extends Component {
  componentDidMount() {
    this.props.getBlogs();
  }

  colors = () => {
    useTheme();
  };

  render() {
    // console.log(this.props.loadingReducer);
    // const {colors} = useTheme();

    // const theme = useTheme();
    return (
      // <ImageBackground
      //   style={{width: '100%', height: '100%'}}
      //   source={require('../assets/home.png')}>
      <View style={Styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {this.props.loadingReducer ? (
          <Text>Loading Please Wait</Text>
        ) : (
          <FlatList
            style={{width: '100%'}}
            data={this.props.listOfBlogs}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={Styles.contentContainer}>
                  <Text style={Styles.title}>{item.title}</Text>
                  <Text style={Styles.content}>{item.content}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: 13,
                    }}>
                    <TouchableHighlight
                      onPress={() =>
                        this.props.navigation.navigate('Edit', {
                          ...item,
                        })
                      }>
                      <View>
                        <Icon size={30} color="#c4ae66" name="edit" />
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                      onPress={() => this.props.deleteBlog(item.key)}>
                      <View>
                        <Icon size={30} color="#c4ae66" name="trash-o" />
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              );
            }}
          />
        )}
        {/* <Zaq name="ios-star" fontFamily="Ionicons" size={30} /> */}
        {/* <View>
          <Text>lets thes thisoeh e </Text>
        </View> */}
      </View>
      // </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  const listOfBlogs = _.map(state.blogsList.blogsList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });
  return {
    listOfBlogs,
    loadingReducer: state.loadingReducer.loadingReducer,
    // one loading reducer from index.js and another from loading reducer.js
  };
}

const Styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#e3d9b6',
    borderRadius: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'left',
  },
  content: {
    fontSize: 18,
    lineHeight: 30,

    elevation: 10,
    padding: 16,
    backgroundColor: '#c4ae66',
    marginBottom: 4,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: 20,
  },
  contentContainer: {
    elevation: 8,
    borderRadius: 18,
    backgroundColor: 'black',
    padding: 12,
    marginBottom: 15,
  },
  // FlatList: {
  //     width: '100% ',
  // },
});

export default connect(mapStateToProps, {getBlogs, deleteBlog})(Blogs);

// import React from 'react';
// import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
// import { useTheme } from '@react-navigation/native';

// const HomeScreen = ({navigation}) => {

//   const { colors } = useTheme();

//   const theme = useTheme();

//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
//         <Text style={{color: colors.text}}>Home Screen</Text>
//       <Button
//         title="Go to details screen"
//         onPress={() => navigation.navigate("Details")}
//       />
//       </View>
//     );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
// });
