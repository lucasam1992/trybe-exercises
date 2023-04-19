import 'mocha';
import { expect } from 'chai';
import { approvedStudents } from '../src';

const disciplinesDict = {
    mathematics: 'matemática',
    history: 'história',
};

describe('Testando a função - approvedStudents -', () => {
    describe('quando todas as notas são maiores que 0.7', () => {
        it('retorna true', () => {
            const disciplines = [
                { name: disciplinesDict.mathematics, grade: 0.8},
                { name: disciplinesDict.history, grade: 0.9},
            ];
            const student = {
                name: 'test',
                disciplines: disciplines
            };
            const result = approvedStudents(student);

            expect(result).to.be.equal(true);
        });
    });

    describe('quando todas as notas sao menores que 0.7', () => {
        it('retorna fase', () => {
            const disciplines = [
                {name: disciplinesDict.mathematics, grade: 0.1},
                {name: disciplinesDict.history, grade: 0.2},
            ];

            const student = {
                name: 'test',
                disciplines: disciplines
            };
            const result = approvedStudents(student);

            expect(result).to.be.equal(false);
        });
    });

    describe('quando parte das notas são menores que 0.7', () => {
        it('retorna false', () => {
            const disciplines = [
                {name: disciplinesDict.mathematics, grade: 0.5},
                {name: disciplinesDict.history, grade: 0.9},
            ];
            const student = {
                name: 'test',
                disciplines: disciplines,
            };

            const result = approvedStudents(student);

            expect(result).to.be.equal(false);
        });
    });
});