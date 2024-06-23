const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todo__container = $('.todo__container');
const add__todo__container = $('.add__todo__container');    

const app = {
    currentIndex: -1,
    currentActiveItemRemoveClass: function(className) {
        if (this.currentIndex == -1) return;
        const currentActiveItem = document.getElementById(`todo__item__${this.currentIndex}`);
        const textbox = document.getElementById(`todo__item__textbox__${this.currentIndex}`);
        currentActiveItem.querySelector('.todo__item__label').innerHTML = textbox.value;
        this.todo_items.forEach((element, index) => {
            if(Number(element.id) === Number(this.currentIndex)) {
                this.todo_items[index].content = textbox.value;
            }
        });

        currentActiveItem.classList.remove(className);
    },
    todo_items: [
        {
            id: '0',
            content: 'learn html',
            isDone: true
        },
        {
            id: '1',
            content: 'learn css',
            isDone: true
        },
        {
            id: '2',
            content: 'learn javascript',
            isDone: false
        },
    ],

    render: function(){
        const htmls = this.todo_items.map((todo, index) => {
            return `
                <div class="todo__item " id="todo__item__${todo.id}" data-index=${todo.id}>
                    <input class="todo__item__checkbox waiting__disable" id="todo__item__checkbox__${todo.id}" type="checkbox" ${todo.isDone == true ? "checked": ""} >
                    <label class="todo__item__label waiting__disable" for="todo__item__checkbox__${todo.id}"> ${todo.content}</label>
                    <input class="todo__item__textbox waiting__active" id="todo__item__textbox__${todo.id}" type="text" value="${todo.content}"> 
                    <div class="todo__item__icon waiting__active" id="todo__item__save">
                        <i class="fa-solid fa-pen"></i>
                    </div>

                    <div class="todo__item__icon waiting__active" id="todo__item__delete">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            `;
        })
        todo__container.innerHTML = htmls.join('');
    },

    handleEvents: function() {
        const _this = this;
        const add_text = $('.add__todo__item__textbox');
        const add_btn = $('.add__todo__item__icon');
        
        // Handle add item
        add_btn.onclick = function() {
            let x = 0;
            _this.todo_items.forEach((item) => {
                x = Math.max(x, (item.id).toString());
            });
            
            
            _this.todo_items.push({
                id: (x + 1).toString(),
                content: add_text.value,
                isDone: false,
            })
            
            add_text.value = '';
            _this.render();
        }

        // Handle activate a item
        var onlongtouch; 
        var timer;
        var save_event;
        var touchduration = 800; //length of time we want the user to touch before we do something
        
        function touchstart(e) {
            if (!timer) {
                timer = setTimeout(onlongtouch, touchduration);
            }
            save_event = e;
        }
        
        function touchend() {
            //stops short touches from firing the event
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
        
        onlongtouch = function() { 

            timer = null;

            var e = save_event;
            const todoNode = e.target.closest('.todo__item');

            if (todoNode) {
                if (todoNode) {
                    if (_this.currentIndex != -1) {
                        _this.currentActiveItemRemoveClass('todo__item--active');
                        _this.currentIndex = -1;
                    }
                    _this.currentActiveItemRemoveClass('');
                    _this.currentIndex = Number(todoNode.dataset.index);
                    todoNode.classList.add('todo__item--active');
                    
                }
            }
            // window.addEventListener(
                // 'click',
                // captureClick,
                // true // <-- This registers this listener for the capture
                       //  phase instead of the bubbling phase!
            // );

        };
        function captureClick(e) {
            e.stopPropagation(); // Stop the click from being propagated.
            window.removeEventListener('click', captureClick, true); // cleanup
        }
        todo__container.addEventListener("touchstart", touchstart);
        todo__container.addEventListener("touchend", touchend);
        todo__container.addEventListener("mousedown", touchstart);
        todo__container.addEventListener("mouseup", touchend);

        // Out focus activation, 
        $('body').onclick = function(e) {
            if (_this.currentIndex != -1) {
                const todoNode = e.target.closest('.todo__item');
                if (todoNode) {
                    if (_this.currentIndex == Number(todoNode.dataset.index)) {
                        todoNode.querySelector('#todo__item__delete').onclick = function(e) {
                            var x;
                            _this.todo_items.forEach((element, index) => {
                                if (element.id == _this.currentIndex) {
                                    x = index; 
                                    return;
                                }
                            });
                            _this.todo_items.splice(x, 1);
                            _this.render();
                            _this.currentIndex = -1;
                        }
                        todoNode.querySelector('#todo__item__save').onclick = function(e) {
                            _this.currentActiveItemRemoveClass('todo__item--active');
                        }

                        return;
                    }
                }
                else {
                    _this.currentActiveItemRemoveClass('todo__item--active');
                    _this.currentIndex = -1;
                }
            }
        }

        todo__container.addEventListener('click', function(e) {
            //e.preventDefault();
            const todoNode = e.target.closest('.todo__item');
            
            if (todoNode) {
                if (_this.currentIndex != -1) {
                    if (_this.currentIndex != Number(todoNode.dataset.index)) {
                        _this.currentActiveItemRemoveClass('todo__item--active');
                        _this.currentIndex = -1;
                        _this.currentActiveItem = $('.hello');
                    } else {
                        return;
                    }
                }
                else {
                    _this.todo_items.forEach((element, index) => {
                        if(Number(element.id) === Number(todoNode.dataset.index)) {
                            _this.todo_items[index].isDone = _this.todo_items[index].isDone === true ? false : true;
                        }
                    });
                }
            }
            _this.render();
        });
        
    },

    start: function(){
        
        this.handleEvents();
        
        this.render();
          
    },
}

// task
app.start();