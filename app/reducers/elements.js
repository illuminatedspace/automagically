
const initialState = {
  textBox: {
    1: { top: 20, left: 80, size: 'large', text: 'My vacay memories', background: 'brown', color: 'pink' },
    2: { top: 100, left: 120, size: 'small', text: 'note to self', background: 'white', color: 'blue' } },
  photo: {
    1: {top: 200, left: 200, size: "small", source: "http://placehold.it/300/09f/fff.png"}
  }
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  let id;

  switch (action.type) {
    case 'SET_ELEMENT_XY':
      newState[action.elementUpdate.type][action.elementUpdate.id].left = action.elementUpdate.left
      newState[action.elementUpdate.type][action.elementUpdate.id].top = action.elementUpdate.top
      break;

    case 'SET_SIZE':
      newState[action.elementUpdateSize.type][action.elementUpdateSize.id].size = action.elementUpdateSize.size
      break;

    case 'CREATE_TEXT_BOX':
      id = Object.keys(action.newTextBox)[0]
      newState.textBox[id] = action.newTextBox[id]
      break;

    case 'ADD_A_PHOTO':
      id = Object.keys(action.photo)[0]
      newState.photo[id] = action.photo[id]
      break;

    case 'EDIT_TEXT':
      id = Object.keys(action.updatedText)[0]
      newState.textBox[id].text = action.updatedText[id].text
      break;

    case 'DELETE_ELEMENT':
      delete newState[action.elementToDelete.type][action.elementToDelete.id]
      break;


    default: return state;
  }

  return newState
}

export const setElementXY = (elementUpdate) => {
  return {
    type: 'SET_ELEMENT_XY',
    elementUpdate, // { id: 1, type: textBox, x: 101, y: 302 }
  }
}

export const setSize = (elementUpdateSize) => {
  return {
    type: "SET_SIZE",
    elementUpdateSize,
  }
}

export const createTextBox = (newTextBox) => {
  return {
    type: 'CREATE_TEXT_BOX',
    newTextBox,
  }
}

export const editText = (updatedText) => {
  return {
    type: 'EDIT_TEXT',
    updatedText,
  }
}

export const addAPhoto = photo => ({
  type: 'ADD_A_PHOTO',
  photo
})

export const deleteElement = (elementToDelete) => {
  return {
    type: 'DELETE_ELEMENT',
    elementToDelete,
  }
}

export default reducer
