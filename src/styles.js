import { makeStyles } from '@mui/styles'
let useStyles = makeStyles({
    box: {
        backgroundColor: 'rgba(0, 0, 255, 0.262)',
        width: '100%',
        height: '50%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "20px"
    },
    container: {
        color: 'white',
        overflow: 'hidden',
        width: '80%',
        height: '100%',

    },
    productNameinput: { width: '100%', height: '10% !important', backgroundColor: 'gray' },
    ProductPriceInput: { width: '100%', height: '10% !important', backgroundColor: 'gray' },
    ProductCategoryInput: { width: '100%', height: '10% !important', backgroundColor: 'gray' }
    , ProductDescriptionInput: {
        height: '250px !important',
        width: '100%',
    },
    btn: {
        alignItems: 'center',
        backgroundColor: 'yellow !important',
        display: 'flex!important',
        width: '25%',
        marginRight:"20px !important",
    },
    search: {
        height: '10% !important'
    },
    tableHeader: {
        backgroundColor: 'rgba(0, 0, 255, 0.262)'
    }
})
export default useStyles
