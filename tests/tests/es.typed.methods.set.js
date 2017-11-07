var test = QUnit.test;

if (DESCRIPTORS) test('%TypedArrayPrototype%.set', function (assert) {
  // we can't implement %TypedArrayPrototype% in all engines, so run all tests for each typed array constructor
  var arrays = ['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint16Array', 'Uint32Array', 'Uint8ClampedArray'];
  for (var i = 0, length = arrays.length; i < length; ++i) {
    var name = arrays[i];
    var TypedArray = global[name];
    var set = TypedArray.prototype.set;
    assert.isFunction(set, name + '::set is function');
    if (NATIVE) assert.arity(set, 1, name + '::set arity is 1');
    assert.name(set, 'set', name + "::set name is 'set'");
    assert.looksNative(set, name + '::set looks native');
    assert.same(new TypedArray(1).set([1]), undefined, 'void');
    var array1 = new TypedArray([1, 2, 3, 4, 5]);
    var array2 = new TypedArray(5);
    array2.set(array1);
    assert.arrayEqual(array2, [1, 2, 3, 4, 5]);
    assert['throws'](function () {
      array2.set(array1, 1);
    });
    assert['throws'](function () {
      array2.set(array1, -1);
    });
    array2.set(new TypedArray([99, 98]), 2);
    assert.arrayEqual(array2, [1, 2, 99, 98, 5]);
    array2.set(new TypedArray([99, 98, 97]), 2);
    assert.arrayEqual(array2, [1, 2, 99, 98, 97]);
    assert['throws'](function () {
      array2.set(new TypedArray([99, 98, 97, 96]), 2);
    });
    assert['throws'](function () {
      array2.set([101, 102, 103, 104], 4);
    });
    var array3 = new TypedArray(2);
    array3.set({ length: 2, 0: 1, 1: 2 });
    assert.arrayEqual(array3, [1, 2]);
    assert['throws'](function () {
      set.call([1, 2, 3], [1]);
    }, "isn't generic");
  }
});
