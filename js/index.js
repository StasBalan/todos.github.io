'use strict';
//get item
const itemForm  = document.getElementById('todo__form');
const input 	= document.getElementById('todo__input');
const inputDate = document.getElementById('todo__date');
const btnAdd    = document.getElementById('btn');
const itemClear = document.getElementById('btn1');
const itemList  = document.getElementById('todo__list');



const itemArr  = [];
const itemArr2 = [];

itemForm.addEventListener('submit', function(event){
	event.preventDefault();
	const textValue = input.value;
	const dateValue = inputDate.value;

	//---------------
	const param = {
		text: textValue,
		date: dateValue,
		id: Math.random().toString(36).slice(2)
	};
	

	//--------------------

	if (textValue === '') {
		document.getElementById('todo__input').classList.remove("border");
		document.getElementById('todo__input').classList.add("error");
		
	}else if (dateValue === '') {
		document.getElementById('todo__date').classList.remove("border");
		document.getElementById('todo__date').classList.add("error");
	}else if(dateValue !== '' || textValue !== '') {
		document.getElementById('todo__input').classList.add("border");
		document.getElementById('todo__date').classList.add("border");
		document.getElementById('todo__date').classList.remove("error");
		addTodos(param);
		input.value = '';
		itemArr2.push(param);
		itemArr.push(param);
		buttonsItem(param);
	}
});
						//localStorage
							var todos;
							function toLocal() {
								todos = itemList.innerHTML;
								localStorage.setItem('todos', todos);	
							}

							if(localStorage.getItem('todos')) {
								itemList.innerHTML = localStorage.getItem('todos');
							}

//function for add list
function addTodos(param) {
	//create elem
	const li 	 = document.createElement('li');
	const h5  	 = document.createElement('label');
	const date       = document.createElement('label');
	const divButtons = document.createElement('div');
	const fasCheck 	 = document.createElement('i');
	const fasDltBtn  = document.createElement('i');

	//assing classes
	li.classList.add('item', 'd-flex');
	li.id = param.id;
	h5.classList.add('item-name');
	date.id = 'date';
	divButtons.classList.add('item-buttons');
	fasCheck.classList.add('fas', 'fa-check', 'complete');
	fasDltBtn.classList.add('fas', 'fa-trash', 'delete');

	//assing children
	itemList.appendChild(li);
	li.appendChild(h5);
	li.appendChild(date);
	li.appendChild(divButtons);
	divButtons.appendChild(fasCheck);
	divButtons.appendChild(fasDltBtn);

	h5.innerText   = input.value;
	date.innerText = inputDate.value;

	toLocal();
}

//function for buttons
function buttonsItem(param) {
	const items = itemList.querySelectorAll('.item');
	items.forEach(function(item){
		if(item.id === param.id) {
			item.querySelector('.complete').addEventListener('click', function(){
				item.querySelector('.item-name').classList.toggle('fill');
				item.querySelector('#date').classList.toggle('fill');
				toLocal();
			});

			item.querySelector('.delete').addEventListener('click', function(){
				//this.closest('li').remove();
				itemList.removeChild(item);
				itemArr.filter(function(item){
					return item !== param;
				});
				toLocal();
			});
		}
	});
}

//Delete all list
itemClear.addEventListener('click', function(){
	localStorage.removeItem('todos');

	if (itemArr.length > 0){
		itemList.querySelectorAll('li').forEach(function(item){
			itemList.removeChild(item);
			itemArr.splice(0, itemArr.length);
		});
	}	
}); 

//function filter 
document.getElementById('search-input').addEventListener('keyup', function(event){
	const text = event.target.value;
	document.querySelectorAll('li').forEach(function(task){
		const item = task.textContent;
		if (item.indexOf(text) != -1) {
			task.style.display = 'flex';
		}else {
			task.style.display = 'none';
		}
	});
});

//function filter date 
document.getElementById('go').addEventListener('click', function(ev){
	const inputDatee = document.getElementById('search-date');
	const date = inputDatee.value;
	document.querySelectorAll('li').forEach(function(tassk){
		const itemD = tassk.textContent;
		if(itemD.indexOf(date) != -1) {
			tassk.style.display = 'flex';
		}else {
			tassk.style.display = 'none';
		}
	});
});


function update(param){
	const myNode = document.getElementById("todo__list");
	while(myNode.firstChild){
		myNode.removeChild(myNode.firstChild);
	}
	for (var i = 0; i < itemArr.length; i++){
		const li 	 = document.createElement('li');
		const h5  	 = document.createElement('label');
		const date       = document.createElement('label');
		const divButtons = document.createElement('div');
		const fasCheck 	 = document.createElement('i');
		const fasDltBtn  = document.createElement('i');

		//assign classes
		li.classList.add('item', 'd-flex');
		li.id = itemArr[i].id;
		h5.classList.add('item-name');
		date.id = 'date';
		divButtons.classList.add('item-buttons');
		fasCheck.classList.add('fas', 'fa-check', 'complete');
		fasDltBtn.classList.add('fas', 'fa-trash', 'delete');

		//assing children
		itemList.appendChild(li);
		li.appendChild(h5);
		li.appendChild(date);
		li.appendChild(divButtons);
		divButtons.appendChild(fasCheck);
		divButtons.appendChild(fasDltBtn);

		h5.innerText   = itemArr[i].text;
		date.innerText = itemArr[i].date;

		const items = itemList.querySelectorAll('.item');

		items.forEach(function(item){
			if(item.id === itemArr[i].id) {
				item.querySelector('.complete').addEventListener('click', function(){
					item.querySelector('.item-name').classList.toggle('fill');
					item.querySelector('#date').classList.toggle('fill');
				});

				item.querySelector('.delete').addEventListener('click', function(){
					this.closest('li').remove();

					itemArr[i] = itemArr.filter(function(item){
						itemArr.splice(0, item);
					});
				});
			}
		});
	}	
}

//function sorting date
function sortingNumb(param){ 
	itemArr.sort(function(a, b){
		return new Date (a.date) - new Date(b.date);		
	});
	update(param);
}

//function sorting letters
function sortingAbc(param){
	itemArr.sort(function(a, b){
		const textA = a.text.toLowerCase(), textB = b.text.toLowerCase();
		if (textA < textB){
			return -1;
		}		
		if (textA > textB){
			return 1;
		}
		return 0;
	});	
	update(param);
}

//function cancel sorting
function sortingCancel(param){ 
	const myNode = document.getElementById("todo__list");
	while(myNode.firstChild){
		myNode.removeChild(myNode.firstChild);
	}
	for (var i = 0; i < itemArr.length; i++){
		const li 	 = document.createElement('li');
		const h5  	 = document.createElement('label');
		const date       = document.createElement('label');
		const divButtons = document.createElement('div');
		const fasCheck 	 = document.createElement('i');
		const fasDltBtn  = document.createElement('i');

		//assing classes
		li.classList.add('item', 'd-flex');
		li.id = itemArr2[i].id;
		h5.classList.add('item-name');
		date.id = 'date';
		divButtons.classList.add('item-buttons');
		fasCheck.classList.add('fas', 'fa-check', 'complete');
		fasDltBtn.classList.add('fas', 'fa-trash', 'delete');

		//assing children
		itemList.appendChild(li);
		li.appendChild(h5);
		li.appendChild(date);
		li.appendChild(divButtons);
		divButtons.appendChild(fasCheck);
		divButtons.appendChild(fasDltBtn);

		h5.innerText   = itemArr2[i].text;
		date.innerText = itemArr2[i].date;

		const items = itemList.querySelectorAll('.item');

		items.forEach(function(item){
			if(item.id === itemArr2[i].id) {
				item.querySelector('.complete').addEventListener('click', function(){
					item.querySelector('.item-name').classList.toggle('fill');
					item.querySelector('#date').classList.toggle('fill');
				});

				item.querySelector('.delete').addEventListener('click', function(){
					this.closest('li').remove();

					itemArr2[i] = itemArr.filter(function(item){
						itemArr.splice(0, item);
					});
				});
			}
		});
	}
}

//buttons for sorting
document.getElementById('sorting-123').addEventListener('click', sortingNumb);
document.getElementById('sorting-abc').addEventListener('click', sortingAbc);
document.getElementById('sorting-cancel').addEventListener('click', sortingCancel);