import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native';
import {editBlog} from '../actions';
import {connect} from 'react-redux';

class Edit extends Component {
  state = {
    title: this.props.navigation.state.params.title,
    // this passes out the text of that key
    content: this.props.navigation.state.params.content,
    key: this.props.navigation.state.params.key,
  };

  submit = () => {
    this.props.editBlog(this.state.title, this.state.content, this.state.key);

    this.setState({
      title: '',
      content: '',
      key: '',
    });

    this.props.navigation.navigate('Blogs');
  };
  render() {
    return (
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}
        source={require('../assets/edit.png')}>
        <View style={Styles.container}>
          <TextInput
            style={Styles.title}
            placeholder="title"
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />

          <TextInput
            style={Styles.content}
            placeholder="content"
            onChangeText={(content) => this.setState({content})}
            value={this.state.content}
          />
          <Button color="#547A43" title="Submit" onPress={this.submit} />
        </View>
      </ImageBackground>
    );
  }
}

const Styles = StyleSheet.create({
  content: {
    marginTop: 20,
    height: 100,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    marginTop: 20,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 18,
  },
});

export default connect(null, {editBlog})(Edit);
