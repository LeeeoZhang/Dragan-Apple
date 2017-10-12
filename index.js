let width = window.innerWidth
let height = window.innerHeight

//创建游戏实例
let game = new Phaser.Game(width, height, Phaser.AUTO, '#game')

//定义游戏场景

let states = {

    //加载场景
    preload: function () {

        //加载场景资源
        this.preload = function () {
            game.stage.backgroundColor = '#000'
            game.load.crossOrigin = 'anonymous' // 设置跨域
            game.load.image('bg', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bg.png')
            game.load.image('dude', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/dude.png')
            game.load.image('green', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/green.png')
            game.load.image('red', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/red.png')
            game.load.image('yellow', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/yellow.png')
            game.load.image('bomb', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bomb.png')
            game.load.image('five', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/five.png')
            game.load.image('three', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/three.png')
            game.load.image('one', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/one.png')
            game.load.audio('bgMusic', '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/bgMusic.mp3')

            //加载进度的文字
            let progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
                fontSize: '60px',
                fill: '#fff'
            })
            progressText.anchor.setTo(0.5, 0.5)

            //监听加载完成一个文件的事件
            game.load.onFileComplete.add(function (progress) {
                progressText.text = progress + '%'
            })

            game.load.onLoadComplete.add(onload)

            //下面是加载提示画面的最小时间限制
            //假设加载太快，加载画面一下就消失
            let deadLine = false
            setTimeout(function () {
                deadLine = true
            }, 1500)

            function onload () {
                if (deadLine) {
                    game.state.start('created')
                } else {
                    setTimeout(function () {
                        onload()
                    }, 1000)
                }
            }
        }
    },

    //开始场景
    created: function () {
        this.create = function () {

            //添加背景
            let backgroundImage = game.add.image(0, 0, 'bg')
            backgroundImage.width = game.world.width
            backgroundImage.height = game.world.height

            //添加标题
            let title = game.add.text(game.world.centerX, game.world.height * 0.25, 'Pickup The Apple', {
                fontSize: '80px',
                fonteWeight: 'bold',
                fill: '#f2bb15'
            })
            title.anchor.setTo(0.5, 0.5)

            //添加提示
            let remind = game.add.text(game.world.centerX, game.world.centerY, 'Click Anywhere To Start Game!', {
                fontSize: '30px',
                fill: '#f2bb15'
            })
            remind.anchor.setTo(0.5, 0.5)

            //添加主角
            let man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'dude')
            let manImage = game.cache.getImage('dude')
            man.width = game.world.width*0.2
            man.height = man.width / manImage.width * manImage.height
            man.anchor.setTo(0.5,0.5)

            //添加事件
            game.input.onTap.add(function(){
                game.state.start('play')
            })
        }
    },

    //游戏场景
    play: function () {
        this.create = function () {
            game.stage.backgroundColor = '#444'
            setTimeout(function () {
                game.state.start('over')
            }, 3000)
        }
    },

    //结束场景
    over: function () {
        this.create = function () {
            game.stage.backgroundColor = '#000'
            alert('Game Over!')
        }
    }
}

//添加游戏场景到游戏中
Object.keys(states).map(function (key) {
    game.state.add(key, states[key])
})

game.state.start('preload')