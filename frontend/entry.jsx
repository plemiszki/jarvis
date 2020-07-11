import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReactModal from 'react-modal'
import { SimpleDetails, StandardIndex } from 'handy-components'

import MainMenu from './components/main-menu'
import NewEntity from './components/new-entity'

import configureStore from './store/store'
let store = configureStore();

window.addEventListener('DOMContentLoaded', () => {

  ReactModal.setAppElement(document.body);
  const MyContext = React.createContext();

  // PUBLIC:

  if (document.querySelector('#main-menu')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <MainMenu
          context={ MyContext }
        />
      </Provider>,
      document.querySelector('#main-menu')
    );
  }

  // ADMIN AREA:

  document.querySelectorAll('#admin-sidebar ul a').forEach((element) => {
    if (element.getAttribute('href') == window.location.pathname) {
      element.classList.add('highlight');
    };
  })

  window.Errors = {}

  if (document.querySelector('#albums-index')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <StandardIndex
          context={ MyContext }
          entityName='album'
          columns={ ['artistName', 'name', 'category'] }
          columnHeaders={ ['Artist', 'Album', 'Category'] }
          modalDimensions={ { width: 900 } }
        >
          <NewEntity
            context={ MyContext }
            initialEntity={ { artistName: '', name: '' } }
          />
        </StandardIndex>
      </Provider>,
      document.querySelector('#albums-index')
    );
  }

  if (document.querySelector('#album-details')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <SimpleDetails
          context={ MyContext }
          entityName='album'
          initialEntity={ { artistName: '', name: '', category: '1' } }
          fields={ [[
            { columnWidth: 5, entity: 'album', property: 'artistName' },
            { columnWidth: 5, entity: 'album', property: 'name' },
            { columnWidth: 2,
              entity: 'album',
              property: 'category',
              type: 'dropdown',
              options: [{ id: '1', text: 'Modern' }, { id: '2', text: 'Classical' }],
              optionDisplayProperty: 'text',
              maxOptions: 3
            }
          ]] }
        />
      </Provider>,
      document.querySelector('#album-details')
    );
  }

});
