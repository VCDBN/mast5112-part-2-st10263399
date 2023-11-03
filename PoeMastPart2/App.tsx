import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';



// Define an interface for the book details
interface BookDetails {
title: string;
author: string;
genre: string;
pages: number;
}

const HomePage = () => {
const [bookTitle, setBookTitle] = useState('');
const [bookAuthor, setBookAuthor] = useState('');
const [bookGenre, setBookGenre] = useState('Select Genre');
const [bookPages, setBookPages] = useState('');

const [lastBookDetails, setLastBookDetails] = useState<BookDetails | null>(
null,
);
const [totalPagesRead, setTotalPagesRead] = useState(0);
const [numberOfBooks, setNumberOfBooks] = useState(0);

const predefinedGenres = [
'Select Genre',
'Fantasy',
'Mystery',
'Romance',
'Horror',
'Fiction',
'Non-Fiction',
];

const addBook = () => {
if (!isFormValid()) {
return;
}

const newBook: BookDetails = {
title: bookTitle,
author: bookAuthor,
genre: bookGenre,
pages: parseInt(bookPages, 10),
};

setLastBookDetails(newBook);
setTotalPagesRead(totalPagesRead + newBook.pages);
setNumberOfBooks(numberOfBooks + 1);

clearForm();
};

const isFormValid = () => {
if (
!bookTitle ||
!bookAuthor ||
bookGenre === 'Select Genre' ||
!bookPages
) {
Alert.alert('Error', 'Please fill in all fields');
return false;
}
return true;
};

const clearForm = () => {
setBookTitle('');
setBookAuthor('');
setBookGenre('Select Genre');
setBookPages('');
};

return (
<View style={styles.container}>
<Text style={styles.heading}>HOME PAGE</Text>
<TextInput
style={styles.input}
placeholder="Title"
value={bookTitle}
onChangeText={text => setBookTitle(text)}
/>
<TextInput
style={styles.input}
placeholder="Author"
value={bookAuthor}
onChangeText={text => setBookAuthor(text)}
/>
<Picker
style={styles.input}
selectedValue={bookGenre}
onValueChange={itemValue => setBookGenre(itemValue)}>
{predefinedGenres.map((genre, index) => (
<Picker.Item key={index} label={genre} value={genre} />
))}
</Picker>
<TextInput
style={styles.input}
placeholder="Number of Pages"
value={bookPages}
onChangeText={text => setBookPages(text)}
keyboardType="numeric"
/>
<Button title="Add Book" onPress={addBook} />

{lastBookDetails && (
<View style={styles.bookDetails}>
<Text>Last Book Details:</Text>
<Text>Title: {lastBookDetails.title}</Text>
<Text>Author: {lastBookDetails.author}</Text>
<Text>Genre: {lastBookDetails.genre}</Text>
<Text>Pages: {lastBookDetails.pages}</Text>
</View>
)}
<View style={styles.statistics}>
<Text>Total Number of Pages Read: {totalPagesRead}</Text>
<Text>
Average Number of Pages Read:{' '}
{numberOfBooks > 0 ? totalPagesRead / numberOfBooks : 0}
</Text>
</View>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'silver',
},
heading: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
backgroundColor: 'silver',
color: 'black',
},
input: {
height: 100,
fontSize: 24,
borderColor: 'grey',
borderWidth: 1,
width: 300,
marginBottom: 10,
padding: 5,
backgroundColor: 'grey',
color: 'black',
},
bookDetails: {
marginTop: 20,
},
statistics: {
marginTop: 20,
},
});

export default HomePage;