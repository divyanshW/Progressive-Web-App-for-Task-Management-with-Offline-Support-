let db;
const request = indexedDB.open("tasksDB", 1);

request.onupgradeneeded = function (event) {
    if (event.target instanceof IDBRequest) {
        db = event.target.result;
        db.createObjectStore("tasks", { keyPath: "id" });
    }
};

request.onsuccess = function (event) {
    if (event.target instanceof IDBRequest) {
        db = event.target.result;
    }
};

request.onerror = function (event) {
    if (event.target instanceof IDBRequest) {
        console.error("IndexedDB error:", event.target.error);
    } else {
        console.error("Unknown IndexedDB error");
    }
};


function saveTask(task) {
    if (!db) return;
    let tx = db.transaction("tasks", "readwrite");
    let store = tx.objectStore("tasks");
    store.add(task);
}

function getTasks() {
    return new Promise((resolve) => {
        if (!db) return resolve([]);
        let tx = db.transaction("tasks", "readonly");
        let store = tx.objectStore("tasks");
        let request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
}

function removeTask(id) {
    if (!db) return;
    let tx = db.transaction("tasks", "readwrite");
    let store = tx.objectStore("tasks");
    store.delete(id);
}
