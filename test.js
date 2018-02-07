const { describe, it } = require('mocha');
const { expect } = require('chai');
const { createCallbag } = require('./index');

describe('Callbag', () => {
  it('should create a callbag', (done) => {
    const callbag1 = createCallbag();
    expect(callbag1).to.have.property('speakTo');
    expect(callbag1).to.have.property('stopSpeakingTo');
    expect(callbag1).to.have.property('hearNow');
    expect(callbag1).to.have.property('hearFrom');
    expect(callbag1).to.have.property('stopHearingFrom');
    done();
  });

  it('should add a speaker', (done) => {
    const callbag1 = createCallbag();
    const speakerOne = callbag1.hearFrom(arg1 => `Hello${arg1}`);
    expect(speakerOne).to.have.property('uuid');
    expect(speakerOne).to.have.property('speak');
    done();
  });

  it('should remove a speaker', (done) => {
    const callbag1 = createCallbag();
    const speakerOne = callbag1.hearFrom(arg1 => `Hello${arg1}`);
    const hasRemoved = callbag1.stopHearingFrom(speakerOne.uuid);

    expect(hasRemoved).to.equal(true);
    done();
  });

  it('should return false if the speaker was not found', (done) => {
    const callbag1 = createCallbag();
    const hasRemoved = callbag1.stopHearingFrom('abc');

    expect(hasRemoved).to.equal(false);
    done();
  });

  it('should add a listener', (done) => {
    const callbag1 = createCallbag();
    const listenerOne = callbag1.speakTo(arg1 => `Hello${arg1}`);
    expect(typeof listenerOne).to.equal('string');
    done();
  });

  it('should remove a listener', (done) => {
    const callbag1 = createCallbag();
    const listenerOne = callbag1.speakTo(arg1 => `Hello${arg1}`);
    const hasRemoved = callbag1.stopSpeakingTo(listenerOne);

    expect(hasRemoved).to.equal(true);
    done();
  });

  it('should return false if the listener was not found', (done) => {
    const callbag1 = createCallbag();
    const hasRemoved = callbag1.stopHearingFrom('abc');

    expect(hasRemoved).to.equal(false);
    done();
  });

  it('should speak directly to the listeners', (done) => {
    const callbag1 = createCallbag();
    callbag1.speakTo((arg1) => {
      expect(arg1).to.equal(true);
      done();
    });

    callbag1.hearNow(true);
  });

  it('should speak to the listeners', (done) => {
    const callbag1 = createCallbag();
    const speakerOne = callbag1.hearFrom(() => 'Hello');
    callbag1.speakTo((arg1) => {
      expect(arg1).to.equal('Hello');
      done();
    });

    speakerOne.speak();
  });

  it('should speak to the listeners even with multiple arguments', (done) => {
    const callbag1 = createCallbag();
    const speakerOne = callbag1.hearFrom((arg1, arg2) => ([arg1, arg1 + arg2, arg2]));
    callbag1.speakTo((arg1, res, arg2) => {
      expect(arg1).to.equal(1);
      expect(res).to.equal(3);
      expect(arg2).to.equal(2);
      done();
    });

    speakerOne.speak(1, 2);
  });

  it('should not speak to the listeners if the speaker is not heard anymore', (done) => {
    const callbag1 = createCallbag();
    const speakerOne = callbag1.hearFrom(() => 'Hello');
    callbag1.speakTo(() => {
      done(false);
    });
    callbag1.stopHearingFrom(speakerOne.uuid);

    speakerOne.speak();

    setTimeout(() => {
      done();
    }, 100);
  });

  it('should not speak to a listener if the listener is not spoken to anymore', (done) => {
    const callbag1 = createCallbag();
    const speakerOne = callbag1.hearFrom(() => 'Hello');
    const listenerOne = callbag1.speakTo(() => {
      done(false);
    });
    callbag1.stopSpeakingTo(listenerOne);

    speakerOne.speak();

    setTimeout(() => {
      done();
    }, 100);
  });
});
