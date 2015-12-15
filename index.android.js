/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var GridView = require('react-native-grid-view');

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 20;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
var MOVIES_PER_ROW = 2;


var Movie = React.createClass({
  clickHandler: function (){
    console.log('clicked ' + this.props.movie.title);
  },

  render: function() {
      return <TouchableHighlight underlayColor='#F5FCFF' onPress={this.clickHandler}>
        <View style={styles.movie}>
          <Image
            source={{uri: this.props.movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View>
            <Text style={styles.title} numberOfLines={3}>
              {this.props.movie.title}
            </Text>
            <Text style={styles.year}>{this.props.movie.year}</Text>
          </View>
        </View>
      </TouchableHighlight>
  },
});

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: responseData.movies,
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <GridView
        items={this.state.dataSource}
        itemsPerRow={MOVIES_PER_ROW}
        renderItem={this.renderItem}
        style={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderItem: function(item) {
      return <Movie movie={item} key={item.id}/>
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  movie: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent:'center',
  },
  title: {
    fontSize: 12,
    marginBottom: 4,
    width: 160,
    textAlign: 'center',
  },
  year: {
    fontSize: 12,
    justifyContent: 'center',
    width: 160,
    textAlign: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
});


AppRegistry.registerComponent('Hello', () => AwesomeProject);