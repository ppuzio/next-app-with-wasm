use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn welcome(name: &str) {
   alert(&format!("Hello {}, from Rust!", name));
}

#[wasm_bindgen]
pub fn add5(input_number: u32) -> u32 {
   return input_number + 5;
}
