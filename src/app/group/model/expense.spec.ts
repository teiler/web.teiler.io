import {Expense} from './expense';
import {ExpenseTestData, GroupTestData} from '../../../test/data/index';
import {Profiteer} from './profiteer';
import {Group} from './group';

describe('Expense', () => {
  beforeEach(() => {
    this.expense = Expense.fromDto(ExpenseTestData.hsrCrewExpense);
  });

  it('should be initialized from Dto', () => {
    const dto = ExpenseTestData.hsrCrewExpense;
    expect(this.expense).toBeTruthy();
    expect(this.expense.title).toEqual(dto.title);
    expect(this.expense.profiteers.length).toEqual(4);
    this.expense.profiteers.forEach((profiteer: Profiteer) => {
      expect(profiteer.isInvolved).toEqual(true);
    });
  });

  it('should split the amount evenly among 4 profiteers', () => {
    const amount = 2000;
    const splittedShare = 500;

    this.expense.amount = amount;
    this.expense.splitEvenly();
    this.expense.profiteers.forEach((profiteer: Profiteer) => {
      expect(profiteer.share).toEqual(splittedShare);
    });
  });

  it('should handle unfulfilled split with 3 profiteers', () => {
    const amount = 1000;
    const adjustedShare = 334;
    const splittedShare = 333;

    this.expense.amount = amount;
    this.expense.profiteers[0].isInvolved = false;
    this.expense.splitEvenly();

    expect(this.expense.profiteers[0].share).toBe(0);
    expect(this.expense.profiteers[1].share).toBe(adjustedShare);
    expect(this.expense.profiteers[2].share).toBe(splittedShare);
    expect(this.expense.profiteers[3].share).toBe(splittedShare);
  });

  it('should split evenly with the rest of the profiteers whose shared amount is not updated manually', () => {
    const amount = 2000;
    this.expense.amount = amount;

    const profiteers = this.expense.profiteers;

    // first manual update & check
    profiteers[0].isInvolved = false;
    this.expense.updateProfiteer(profiteers[1], 1000, true);
    this.expense.splitEvenlyAmongRestProfiteers();
    expect(profiteers[0].share).toBe(0);
    expect(profiteers[1].share).toBe(1000);
    expect(profiteers[2].share).toBe(500);
    expect(profiteers[3].share).toBe(500);

    // second manual update & check
    this.expense.updateProfiteer(profiteers[2], 800, true);
    this.expense.splitEvenlyAmongRestProfiteers();
    expect(profiteers[0].share).toBe(0);
    expect(profiteers[1].share).toBe(1000);
    expect(profiteers[2].share).toBe(800);
    expect(profiteers[3].share).toBe(200);
  });

  it('should fill people as profiteers', () => {
    const hsrCrew: Group = Group.fromDto(GroupTestData.hsrCrew);
    const expense = new Expense(0, null, 0, 'Expense Test', []);
    expense.profiteers.push(new Profiteer(hsrCrew.people[0], 0));

    expect(expense).toBeTruthy();
    expect(expense.profiteers.length).toEqual(1);
    expense.fillProfiteers(hsrCrew.getPeopleAsMap(), true);
    expect(expense.profiteers.length).toEqual(4);
  });

  it('should validate correctly', () => {
    expect(this.expense.isValid()).toBeFalsy();

    this.expense.amount = 1000;
    expect(this.expense.isValid()).toBeFalsy();
    this.expense.splitEvenly();
    expect(this.expense.isValid()).toBeTruthy();
  });
});
