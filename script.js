function updateSearchHistory() {
    console.log("Updating search history");
    const searchHistoryList = document.getElementById('search-history');
    searchHistoryList.innerHTML = '';
    return db.collection("searchHistory").orderBy("timestamp", "desc").limit(10).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="search-term">${doc.data().term}</span>
                <span class="delete-item" data-id="${doc.id}"><i class="fas fa-times"></i></span>
            `;
            searchHistoryList.appendChild(li);
        });
        console.log("Search history updated successfully");
    })
    .catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

function addToSearchHistory(term) {
    console.log("Adding to search history: ", term);
    return db.collection("searchHistory").add({
        term: term,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Document successfully written!");
        return updateSearchHistory();
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function showLoader() {
    console.log("Showing loader");
    document.getElementById('loader').style.display = 'flex';
    document.getElementById('content').classList.remove('visible');
} 2000;

function hideLoader() {
    console.log("Hiding loader");
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').classList.add('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearHistoryButton = document.getElementById('clear-history');
    const searchHistoryList = document.getElementById('search-history');

    showLoader();

    updateSearchHistory()
        .then(() => {
            console.log("Initial history update complete");
            hideLoader();
        })
        .catch((error) => {
            console.error("Error during initial history update: ", error);
            hideLoader();
        });

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            addToSearchHistory(searchTerm)
                .then(() => {
                    searchInput.value = '';
                    console.log(`Searching for: ${searchTerm}`);
                });
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    clearHistoryButton.addEventListener('click', () => {
        console.log("Clearing history");
        db.collection("searchHistory").get().then((querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            return batch.commit();
        }).then(() => {
            console.log("Entire search history deleted");
            return updateSearchHistory();
        }).catch((error) => {
            console.error("Error removing documents: ", error);
        });
    });

    searchHistoryList.addEventListener('click', (e) => {
        if (e.target.closest('.delete-item')) {
            const id = e.target.closest('.delete-item').getAttribute('data-id');
            db.collection("searchHistory").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
                return updateSearchHistory();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        } else if (e.target.closest('.search-term')) {
            const searchTerm = e.target.closest('.search-term').textContent;
            searchInput.value = searchTerm;
            searchButton.click();
        }
    });
});