import {
  all,
  call,
  delay,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as api from "../../api";
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  getProductRequest,
  getProductSuccess,
  updateProductFailure,
  updateProductSuccess,
} from "../reducers/product";

//render API saga
function* fetchProductSaga(action) {
  const products = yield call(api.fetchProduct);
  console.log(products);
  yield put(getProductSuccess(products.data.Products));
}
function* getproductsaga() {
  yield takeLatest("product/getProductRequest", fetchProductSaga);
}
// delete API saga
function* fetchdeleteProductSaga({ payload }) {
  try {
    yield api.deleteProduct(payload);
    yield delay(1000);
    yield put(deleteProductSuccess());
  } catch (error) {
    yield put(deleteProductFailure());
  }
}
function* onDeleteproductsaga() {
  yield takeLatest("product/deleteProductRequest", fetchdeleteProductSaga);
}
// create API saga
function* createProductSaga({ payload }) {
  console.log(payload);
  try {
    yield api.createProduct(payload);
    yield put(createProductSuccess());
  } catch (error) {
    yield put(createProductFailure());
  }
}
function* createproductsaga() {
  yield takeLatest("product/createProductRequest", createProductSaga);
}
// Update API saga
// create API saga
function* updateProductSaga({payload: { id, formData }}) {
  console.log(formData);
  console.log(id);
  try {
    yield api.updateProduct(id, formData);
    yield put(updateProductSuccess());
  } catch (error) {
    yield put(updateProductFailure());
  }
}
function* updateproductsaga() {
  yield takeLatest("product/updateProductRequest", updateProductSaga);
}
function* productsaga() {
  yield all([
    call(createproductsaga),
    call(updateproductsaga),
    call(getproductsaga),
    call(onDeleteproductsaga),
  ]);
}

export default productsaga;
