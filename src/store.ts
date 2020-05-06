
import {observable} from 'mobx'

export var CounterValue = observable({
    count: 0,
    increment: () => CounterValue.count = CounterValue.count+1,
    decrement: () => CounterValue.count = CounterValue.count-1
})