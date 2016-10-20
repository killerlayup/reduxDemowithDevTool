import React from 'react'
import SearchBar from '../components/searchBar'
import Content from '../components/content'
import Footer from '../components/footer'
import { connect } from 'react-redux'
import ImmutableRenderMixin from 'react-immutable-render-mixin'
import * as ItemsActions from '../actions'
import { bindActionCreators } from 'redux'

let AddItems = React.createClass({
    mixins: [ImmutableRenderMixin],
    propTypes: {
        items: React.PropTypes.object,
        filter: React.PropTypes.string
    },
    render() {
        let styles = {
            width: '200px',
            margin: '30px auto 0'
        }
        const actions = this.props.actions

        return (
            <div style={styles}>
                <h2>Manage Items</h2>
                <SearchBar filterItem={actions.filterItem}/>
                <Content items={this.props.items} filter={this.props.filter} deleteItem={actions.deleteItem}/>
                <Footer addItem={actions.addItem} deleteAll={actions.deleteAll}/>
            </div>
        )
    }
})
//connect(mapStateToProps, mapDispatchToProps)(Component)
//把state disaptch 转换成props, 传到组件中 返回给我们使用
//只返回组件需要的部分state  这边的item是在reducer中定义的
function mapStateToProps (state) {
    // body...
    return {
        items:state.items,
        filter:state.filter
    }
}
//负责返回一个 dispatchProps dispatchProps 是actionCreator的key和dispatch(action)的组合。
function mapDispatchToProps (dispatch){
    return {
        //bindActionCreators 的作用就是将 Actions 和 dispatch 组合起来生成 mapDispatchToProps 需要生成的内容
        actions: bindActionCreators(ItemsActions, dispatch)
    }
}
// export default connect(state => ({
//     items: state.items,
//     filter: state.filter
// }), dispatch => ({
//     actions: bindActionCreators(ItemsActions, dispatch)
// }))(AddItems)
export default AddItems = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AddItems);