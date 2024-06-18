const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const todo__container = $('.todo__container');
const add__todo__container = $('.add__todo__container');    

const app = {
    currentIndex: -1,
    todo_items: [
        {
            id: '1',
            content: 'hi. my name is Huy',
            isDone: false
        },
        {
            id: '2',
            content: 'hi. my name is Kiet',
            isDone: true
        },
        {
            id: '3',
            content: 'hi. my name is Quang',
            isDone: false
        },
        {
            id: '4',
            content: 'hi. my name is Phuong',
            isDone: true
        },
    ],

    render: function(){
        const htmls = this.todo_items.map((todo, index) => {
            // ${todo.isDone === true ? 'todo__item--active': ''}"
            return `
                <div class="todo__item"  data-index=${index}>
                    <input class="todo__item__checkbox waiting__disable" id="todo__item__${index}" type="checkbox">
                    <label class="todo__item__label waiting__disable" for="todo__item__${index}"> ${todo.content}</label>
                    <input class="todo__item__textbox waiting__active" type="text" value="${todo.content}"> 
                    <div class="todo__item__icon todo__item__delete waiting__active">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            `;
        })
        todo__container.innerHTML = htmls.join('');
    },

    handleEvents: function() {
        const _this = this;
        const add_text = $('.todo__item__textbox');
        const add_btn = $('.todo__item__add');
        
        // Handle add item
        add_btn.onclick = function() {
            _this.todo_items.push({
                id: toString(_this.todo_items.length + 1),
                content: add_text.value,
                isDone: false,
            })
            _this.render();
        }
        console.log(add_btn);

        var onlongtouch; 
        var timer;
        var save_event;
        var touchduration = 800; //length of time we want the user to touch before we do something
        
        function touchstart(e) {
            e.preventDefault();
            console.log("touchstart")
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
            document.getElementById('ping').innerText+='ping\n'; 

            var e = save_event;
            const todoNode = e.target.closest('.todo__item');

            console.log(todoNode);
            const todo = $(`.${todoNode.c}`);
            if (todoNode) {
                if (todoNode) {
                    if (_this.currentIndex != -1) {

                    }

                    
                    _this.currentIndex = Number(todoNode.dataset.index);
                    todoNode.classList.add('todo__item--active');
                    
                }
            }

        };
        todo__container.addEventListener("touchstart", touchstart);
        todo__container.addEventListener("touchend", touchend);
        todo__container.addEventListener("mousedown", touchstart);
        todo__container.addEventListener("mouseup", touchend);

        
        // document.addEventListener("DOMContentLoaded", function(event) { 
        //     window.addEventListener("touchstart", touchstart, false);
        //     window.addEventListener("touchend", touchend, false);

        // });

        // todo__container.onLongTouch = function(e) {
        //     const todoNode = e.target.closeset('.todo__item');
        //     console.log(todonNode.property);
        //     if (todoNode) {
        //         if (todoNode) {
        //             if (_this.currentIndex != -1) {

        //             }

                    
        //             _this.currentIndex = Number(todoNode.dataset.index);
        //             todoNode.add('todo__item--active');
                    
        //         }
        //     }
        // }
    },

    start: function(){
        
        this.handleEvents();
        
        this.render();
          
    },
}
// task
app.start();