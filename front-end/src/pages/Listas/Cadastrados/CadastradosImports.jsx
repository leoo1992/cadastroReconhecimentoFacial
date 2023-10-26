import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import '../listas.css';
import api from '../axiosConfig';
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner';
import MenuIcon from '../../HomePage/Menuicon';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DeleteModal from './DeleteModal';
import DesativarModal from './DesativarModal';
import SubHeaderComponent from './SubHeaderComponent';
import ContextActions from './ContextActions';

const formatarCPF = (cpf) => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};

const ativoEnum = {
  0: "Não",
  1: "Sim",
},
  tipoEnum = {
    0: "Aluno",
    1: "Funcionário",
    2: "Responsável",
    3: "Terceiro",
  },
  customText = {
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
  },
  divElement = document.querySelector('.rdt_TableHeader > div > div'),
  columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
      width: '60px',
    },
    {
      name: 'Nome',
      selector: (row) => row.nome,
      sortable: true,
      reorder: true,
    },
    {
      name: 'CPF',
      selector: (row) => formatarCPF(row.cpf),
      sortable: true,
      reorder: true,
      width: '120px',
    },
    {
      name: 'Tipo',
      selector: (row) => tipoEnum[row.tipo],
      sortable: true,
      reorder: true,
      width: '120px',
    },
    {
      name: 'Ativo',
      selector: (row) => ativoEnum[row.ativo],
      sortable: true,
      reorder: true,
      width: '80px',
    },
  ];

export {
  React, useState, useEffect, useCallback, useNavigate,
  api, jsPDF, XLSX, toast, ToastContainer, DataTable, Triangle,
  DeleteModal, MenuIcon, DesativarModal, SubHeaderComponent, ContextActions,
  ativoEnum, tipoEnum, customText, divElement, columns
};
