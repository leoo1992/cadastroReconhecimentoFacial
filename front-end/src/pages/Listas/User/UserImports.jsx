import React, { useState, useEffect, useCallback } from 'react';
import '../listas.css';
import api from '../axiosConfig';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Triangle } from 'react-loader-spinner';
import MenuIcon from '../../HomePage/Menuicon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DeleteUserModal from './DeleteUserModal';
import SubHeaderUser from './SubHeaderUser';
import UserContextActions from './UserContextActions';

const columns = [
  {
    name: 'Id',
    selector: (row) => row.id,
    sortable: true,
    reorder: true,
    width: '60px',
  },
  {
    name: 'Usuario',
    selector: (row) => row.usuario,
    sortable: true,
    reorder: true,
  },
];

const customText = {
  rowsPerPage: 'Linhas por página:',
  previous: 'Anterior',
  next: 'Próxima',
  loading: 'Carregando',
  noMatch: 'Nenhum registro encontrado',
  page: 'Página',
  of: 'de',
  selected: '{0} selecionado',
  noSelectedRowsSelected: '',
  selectedRows: {
    one: '{0} selecionado',
    other: '{0} selecionados',
  },
  noRowsSelected: '',
};

export {
  React,
  useState,
  useEffect,
  useCallback,
  api,
  DataTable,
  FontAwesomeIcon,
  faTrash,
  Triangle,
  MenuIcon,
  OverlayTrigger,
  Tooltip,
  toast,
  ToastContainer,
  jsPDF,
  XLSX,
  DeleteUserModal,
  SubHeaderUser,
  columns,
  customText,
  UserContextActions
};
